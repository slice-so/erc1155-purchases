// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./structs/ProductToken.sol";
import "./extensions/Purchasable/SlicerPurchasable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ERC1155Purchases is SlicerPurchasable, ERC1155Receiver, Ownable {
    error Invalid();

    /// ============ Storage ============

    // Mapping from Product ID to erc1155 tokenId
    mapping(uint256 => ProductToken) private _productTokens;

    /// ========== Constructor ===========
    constructor(address productsModuleAddress_, uint256 slicerId_)
        SlicerPurchasable(productsModuleAddress_, slicerId_)
    {}

    /// ============ Functions ============

    /**
     * @notice Overridable function containing the requirements for an account to be eligible for the purchase.
     *
     * @dev Used on the Slice interface to check whether a user is able to buy a product. See {ISlicerPurchasable}.
     * @dev Max quantity purchasable per address and total mint amount is handled on Slicer product logic
     */
    function isPurchaseAllowed(
        uint256,
        uint256 productId,
        address account,
        uint256,
        bytes memory,
        bytes memory buyerCustomData
    ) public view override returns (bool isAllowed) {
        // Product sales allowed by default
        isAllowed = true;

        // If an erc20 gate has been setup
        if (_productTokens[productId].erc20 != IERC20(address(0))) {
            // Check if buyer has enough tokens
            isAllowed =
                _productTokens[productId].erc20.balanceOf(account) >=
                _productTokens[productId].gateAmount;
        }

        // If a merkle root has been setup
        if (_productTokens[productId].merkleRoot != "") {
            // Get Merkle proof from buyerCustomData
            bytes32[] memory proof = abi.decode(buyerCustomData, (bytes32[]));

            // Generate leaf from account address
            bytes32 leaf = keccak256(abi.encodePacked(account));

            // Check if Merkle proof is valid
            isAllowed = MerkleProof.verify(proof, _productTokens[productId].merkleRoot, leaf);
        }
    }

    /**
     * @notice Overridable function to handle external calls on product purchases from slicers. See {ISlicerPurchasable}
     */
    function onProductPurchase(
        uint256 slicerId,
        uint256 productId,
        address account,
        uint256 quantity,
        bytes memory slicerCustomData,
        bytes memory buyerCustomData
    ) external payable override onlyOnPurchaseFrom(slicerId) {
        // Check whether the account is allowed to buy a product.
        if (
            !isPurchaseAllowed(
                slicerId,
                productId,
                account,
                quantity,
                slicerCustomData,
                buyerCustomData
            )
        ) revert NotAllowed();

        // Add product purchase logic here
        ProductToken memory p = _productTokens[productId];

        uint256[] memory amounts = new uint256[](p.tokenIds.length);

        for (uint256 i; i < p.tokenIds.length; ) {
            amounts[i] = quantity;
            unchecked {
                ++i;
            }
        }

        p.contractAddress.safeBatchTransferFrom(address(this), account, p.tokenIds, amounts, "");
    }

    /**
     * @notice Sets a `productId` to execute the transfer of a certain `tokenId`
     */
    function setTokenIdToProduct(
        uint256 productId,
        IERC1155 erc1155,
        uint256[] calldata tokenIds,
        bytes32 merkleRoot,
        IERC20 erc20,
        uint256 gateAmount
    ) external onlyOwner {
        _productTokens[productId] = ProductToken(erc1155, tokenIds, merkleRoot, erc20, gateAmount);
    }

    /**
     * @notice Function called when ERC1155 tokens are received
     */
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    /**
     * @dev See `onERC1155Received`
     */
    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
}

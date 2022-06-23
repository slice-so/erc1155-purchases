import { expect } from "chai"
import { ethers } from "hardhat"
import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import { ERC1155Purchases } from "../../typechain-types/ERC1155Purchases"
import { createSlicer, createProduct } from "../../utils"
import { SLXAddress } from "../../utils/deployJB/deployJB"
import {
  a0,
  a1,
  a2,
  a3,
  a4,
  a5,
  addr1,
  isPurchaseAllowedSignature,
  onProductPurchaseSignature,
  productsModule,
  sliceCore,
  slx,
} from "../setup"

describe("{ERC1155Purchases}", () => {
  let slicerAddr: string
  let erc1155Purchases: ERC1155Purchases
  let merkleTree: MerkleTree
  let slicerId: number
  let slicerId2: number
  const gateAmount = 1000

  it("Contract is deployed and initialized", async () => {
    const ERC1155PURCHASES = await ethers.getContractFactory("ERC1155Purchases")

    // Calculate merkle root
    const allowedAddresses = [a1, a2, a3]
    const leafNodes = allowedAddresses.map((addr) => keccak256(addr))
    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    const merkleRoot = merkleTree.getHexRoot()

    // Create slicer
    const { slicerAddress, tokenId } = await createSlicer(
      [
        { account: a0, shares: 90 },
        { account: a1, shares: 10 },
      ],
      20,
      0,
      0,
      [],
      false
    )

    // Create slicer to test multiple token sales
    const { tokenId: tokenId2 } = await createSlicer(
      [
        { account: a0, shares: 90 },
        { account: a1, shares: 10 },
      ],
      20,
      0,
      0,
      [],
      false
    )

    slicerAddr = slicerAddress
    slicerId = tokenId
    slicerId2 = tokenId2

    // Deploy contract
    erc1155Purchases = (await ERC1155PURCHASES.deploy(
      productsModule.address,
      slicerId
    )) as ERC1155Purchases
    await erc1155Purchases.deployed()

    // Create products

    // #1 - Public sale
    await createProduct(slicerId, 0, 100, "0.1", false, false, [], {
      externalAddress: erc1155Purchases.address,
      checkFunctionSignature: isPurchaseAllowedSignature,
      execFunctionSignature: onProductPurchaseSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })

    // #2 - Allowlisted, free,
    await createProduct(slicerId, 0, 100, [], true, false, [], {
      externalAddress: erc1155Purchases.address,
      checkFunctionSignature: isPurchaseAllowedSignature,
      execFunctionSignature: onProductPurchaseSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })

    // #3 - TokenGated, paid & multiple tokens
    await createProduct(slicerId, 0, 100, "0.1", false, false, [], {
      externalAddress: erc1155Purchases.address,
      checkFunctionSignature: isPurchaseAllowedSignature,
      execFunctionSignature: onProductPurchaseSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })

    // #4 - TokenGated and Allowlisted, paid
    await createProduct(slicerId, 0, 100, "0.1", false, false, [], {
      externalAddress: erc1155Purchases.address,
      checkFunctionSignature: isPurchaseAllowedSignature,
      execFunctionSignature: onProductPurchaseSignature,
      data: [],
      value: ethers.utils.parseEther("0"),
    })

    // Transfer erc1155 tokens (sliceCore) to contract to enable sales
    await sliceCore.safeBatchTransferFrom(
      a0,
      erc1155Purchases.address,
      [tokenId, tokenId2],
      [10, 10],
      []
    )

    // Set correct params in products
    await erc1155Purchases.setTokenToProduct(
      1,
      sliceCore.address,
      [tokenId],
      ethers.constants.HashZero,
      ethers.constants.AddressZero,
      gateAmount
    )

    await erc1155Purchases.setTokenToProduct(
      2,
      sliceCore.address,
      [tokenId],
      merkleRoot,
      ethers.constants.AddressZero,
      0
    )

    await erc1155Purchases.setTokenToProduct(
      3,
      sliceCore.address,
      [tokenId, tokenId2],
      ethers.constants.HashZero,
      SLXAddress,
      gateAmount
    )
    await erc1155Purchases.setTokenToProduct(
      4,
      sliceCore.address,
      [tokenId],
      merkleRoot,
      SLXAddress,
      gateAmount
    )

    // Send SLX to a1 and a4
    await slx.transfer(a1, gateAmount)
    await slx.transfer(a4, gateAmount)
  })

  describe("isPurchaseAllowed", () => {
    it("Product #1 - Returns true", async () => {
      const isAllowedA1 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        1,
        a1,
        1,
        [],
        []
      )
      const isAllowedA4 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        1,
        a4,
        1,
        [],
        []
      )

      expect(isAllowedA1).to.be.equal(true)
      expect(isAllowedA4).to.be.equal(true)
    })

    it("Product #2 - Returns true if in allowlist, false if not", async () => {
      const proofA1 = merkleTree.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const isAllowedA1 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        2,
        a1,
        1,
        [],
        buyerCustomDataA1
      )

      const proofA4 = merkleTree.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )
      const isAllowedA4 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        2,
        a4,
        1,
        [],
        buyerCustomDataA4
      )

      expect(isAllowedA1).to.be.equal(true)
      expect(isAllowedA4).to.be.equal(false)
    })

    it("Product #3 - Returns true if has enough tokens, false if not", async () => {
      const isAllowedA1 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        3,
        a1,
        1,
        [],
        []
      )
      const isAllowedA5 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        3,
        a5,
        1,
        [],
        []
      )

      expect(isAllowedA1).to.be.equal(true)
      expect(isAllowedA5).to.be.equal(false)
    })

    it("Product #4 - Returns true if allowlisted and has enough tokens, false if not", async () => {
      const proofA1 = merkleTree.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const isAllowedA1 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        4,
        a1,
        1,
        [],
        buyerCustomDataA1
      )

      const proofA2 = merkleTree.getHexProof(keccak256(a2))
      const buyerCustomDataA2 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA2]
      )
      const isAllowedA2 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        4,
        a2,
        1,
        [],
        buyerCustomDataA2
      )

      const proofA4 = merkleTree.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )
      const isAllowedA4 = await erc1155Purchases.isPurchaseAllowed(
        slicerId,
        4,
        a4,
        1,
        [],
        buyerCustomDataA4
      )

      expect(isAllowedA1).to.be.equal(true)
      expect(isAllowedA2).to.be.equal(false)
      expect(isAllowedA4).to.be.equal(false)
    })
  })

  describe("onProductPurchase", () => {
    it("Product #1 - NFT transferred on purchase", async () => {
      const initBalance = await sliceCore.balanceOf(a1, slicerId)

      await productsModule.payProducts(
        a1,
        [
          {
            slicerId,
            productId: 1,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ],
        { value: ethers.utils.parseEther("0.1") }
      )

      const finalBalance = await sliceCore.balanceOf(a1, slicerId)
      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })

    it("Product #2 - NFT transferred on purchase", async () => {
      const proofA1 = merkleTree.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const initBalance = await sliceCore.balanceOf(a1, slicerId)

      await productsModule.payProducts(a1, [
        {
          slicerId,
          productId: 2,
          quantity: 1,
          currency: ethers.constants.AddressZero,
          buyerCustomData: buyerCustomDataA1,
        },
      ])

      const finalBalance = await sliceCore.balanceOf(a1, slicerId)
      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })

    it("Product #3 - NFT transferred on purchase (x2)", async () => {
      const initBalance1 = await sliceCore.balanceOf(a1, slicerId)
      const initBalance2 = await sliceCore.balanceOf(a1, slicerId2)

      await productsModule.payProducts(
        a1,
        [
          {
            slicerId,
            productId: 3,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ],
        { value: ethers.utils.parseEther("0.1") }
      )

      const finalBalance1 = await sliceCore.balanceOf(a1, slicerId)
      const finalBalance2 = await sliceCore.balanceOf(a1, slicerId2)
      expect(finalBalance1.sub(initBalance1)).to.be.equal(1)
      expect(finalBalance2.sub(initBalance2)).to.be.equal(1)
    })

    it("Product #3 - Multiple NFTs transferred on purchase (x2)", async () => {
      const initBalance1 = await sliceCore.balanceOf(a1, slicerId)
      const initBalance2 = await sliceCore.balanceOf(a1, slicerId2)

      await productsModule.payProducts(
        a1,
        [
          {
            slicerId,
            productId: 3,
            quantity: 3,
            currency: ethers.constants.AddressZero,
            buyerCustomData: [],
          },
        ],
        { value: ethers.utils.parseEther("0.3") }
      )

      const finalBalance1 = await sliceCore.balanceOf(a1, slicerId)
      const finalBalance2 = await sliceCore.balanceOf(a1, slicerId2)
      expect(finalBalance1.sub(initBalance1)).to.be.equal(3)
      expect(finalBalance2.sub(initBalance2)).to.be.equal(3)
    })

    it("Product #4 - NFT transferred on purchase", async () => {
      const proofA1 = merkleTree.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )
      const initBalance = await sliceCore.balanceOf(a1, slicerId)

      await productsModule.payProducts(
        a1,
        [
          {
            slicerId,
            productId: 4,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA1,
          },
        ],
        { value: ethers.utils.parseEther("0.1") }
      )

      const finalBalance = await sliceCore.balanceOf(a1, slicerId)
      expect(finalBalance.sub(initBalance)).to.be.equal(1)
    })
  })

  describe("withdrawTokens", () => {
    it("Tokens withdrawn successfully", async () => {
      const initBalance = await sliceCore.balanceOf(a0, slicerId)
      await erc1155Purchases.withdrawTokens(sliceCore.address, slicerId, 2)
      const finalBalance = await sliceCore.balanceOf(a0, slicerId)
      expect(finalBalance.sub(initBalance)).to.be.equal(2)
    })
  })

  describe("Reverts", () => {
    it("onProductPurchase - Insufficient payment (Product #1)", async () => {
      const proofA4 = merkleTree.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )

      await expect(
        productsModule.payProducts(
          a4,
          [
            {
              slicerId,
              productId: 1,
              quantity: 1,
              currency: ethers.constants.AddressZero,
              buyerCustomData: buyerCustomDataA4,
            },
          ],
          { value: ethers.utils.parseEther("0.09") }
        )
      ).to.be.reverted
    })

    it("onProductPurchase - Not in allowlist (Product #2)", async () => {
      const proofA4 = merkleTree.getHexProof(keccak256(a4))
      const buyerCustomDataA4 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA4]
      )

      await expect(
        productsModule.payProducts(a4, [
          {
            slicerId,
            productId: 2,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA4,
          },
        ])
      ).to.be.reverted
    })

    it("onProductPurchase - Wrong proof (Product #2)", async () => {
      const proofA1 = merkleTree.getHexProof(keccak256(a1))
      const buyerCustomDataA1 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA1]
      )

      await expect(
        productsModule.payProducts(a2, [
          {
            slicerId,
            productId: 2,
            quantity: 1,
            currency: ethers.constants.AddressZero,
            buyerCustomData: buyerCustomDataA1,
          },
        ])
      ).to.be.reverted
    })

    it("onProductPurchase - Not enough tokens (Product #3)", async () => {
      await expect(
        productsModule.payProducts(
          a2,
          [
            {
              slicerId,
              productId: 3,
              quantity: 1,
              currency: ethers.constants.AddressZero,
              buyerCustomData: [],
            },
          ],
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.reverted
    })

    it("onProductPurchase - Not enough tokens or not in allowlist (Product #4)", async () => {
      const proofA2 = merkleTree.getHexProof(keccak256(a2))
      const buyerCustomDataA2 = ethers.utils.defaultAbiCoder.encode(
        ["bytes32[]"],
        [proofA2]
      )

      // Not enough tokens
      await expect(
        productsModule.payProducts(
          a2,
          [
            {
              slicerId,
              productId: 4,
              quantity: 1,
              currency: ethers.constants.AddressZero,
              buyerCustomData: buyerCustomDataA2,
            },
          ],
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.reverted

      // Not in allowlist
      await expect(
        productsModule.payProducts(
          a4,
          [
            {
              slicerId,
              productId: 4,
              quantity: 1,
              currency: ethers.constants.AddressZero,
              buyerCustomData: [],
            },
          ],
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.reverted
    })

    it("Only contract owner can call setTokenToProduct and withdrawTokens", async () => {
      await expect(
        erc1155Purchases
          .connect(addr1)
          .setTokenToProduct(
            5,
            sliceCore.address,
            [slicerId],
            "",
            "",
            gateAmount
          )
      ).to.be.reverted
      await expect(
        erc1155Purchases
          .connect(addr1)
          .withdrawTokens(sliceCore.address, slicerId, 2)
      ).to.be.reverted
    })
  })
})

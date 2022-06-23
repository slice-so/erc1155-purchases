/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155Purchases,
  ERC1155PurchasesInterface,
} from "../ERC1155Purchases";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "productsModuleAddress_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "slicerId_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Invalid",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "NotPurchase",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSuccessful",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongSlicer",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "buyerCustomData",
        type: "bytes",
      },
    ],
    name: "isPurchaseAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "isAllowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "slicerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "slicerCustomData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "buyerCustomData",
        type: "bytes",
      },
    ],
    name: "onProductPurchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        internalType: "contract IERC1155",
        name: "erc1155",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "contract IERC20",
        name: "erc20",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "gateAmount",
        type: "uint256",
      },
    ],
    name: "setTokenToProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC1155",
        name: "erc1155",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161111a38038061111a83398101604081905261002f916100b7565b600080546001600160a01b0319166001600160a01b038416179055608081905261005e6100593390565b610065565b50506100f1565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600080604083850312156100ca57600080fd5b82516001600160a01b03811681146100e157600080fd5b6020939093015192949293505050565b60805161100e61010c60003960006108a4015261100e6000f3fe6080604052600436106100915760003560e01c806395db93681161005957806395db93681461014a578063a23fffb91461016a578063bc197c811461017d578063f23a6e61146101c5578063f2fde38b146101f257600080fd5b806301ffc9a71461009657806309b98fb4146100cb5780634c1d1fde146100ed578063715018a61461010d5780638da5cb5b14610122575b600080fd5b3480156100a257600080fd5b506100b66100b13660046109e0565b610212565b60405190151581526020015b60405180910390f35b3480156100d757600080fd5b506100eb6100e6366004610a72565b610249565b005b3480156100f957600080fd5b506100eb610108366004610af9565b61036c565b34801561011957600080fd5b506100eb610439565b34801561012e57600080fd5b506001546040516001600160a01b0390911681526020016100c2565b34801561015657600080fd5b506100b6610165366004610be5565b61046f565b6100eb610178366004610be5565b6105c5565b34801561018957600080fd5b506101ac610198366004610cb9565b63bc197c8160e01b98975050505050505050565b6040516001600160e01b031990911681526020016100c2565b3480156101d157600080fd5b506101ac6101e0366004610d78565b63f23a6e6160e01b9695505050505050565b3480156101fe57600080fd5b506100eb61020d366004610df4565b61079e565b60006001600160e01b03198216630271189760e51b148061024357506301ffc9a760e01b6001600160e01b03198316145b92915050565b6001546001600160a01b0316331461027c5760405162461bcd60e51b815260040161027390610e11565b60405180910390fd5b6040518060a00160405280876001600160a01b03168152602001868680806020026020016040519081016040528093929190818152602001838360200280828437600092018290525093855250505060208083018790526001600160a01b0386811660408086019190915260609094018690528b83526002825292909120835181546001600160a01b03191693169290921782558281015180516103269260018501920190610980565b506040820151600282015560608201516003820180546001600160a01b0319166001600160a01b0390921691909117905560809091015160049091015550505050505050565b6001546001600160a01b031633146103965760405162461bcd60e51b815260040161027390610e11565b826001600160a01b031663f242432a306103b86001546001600160a01b031690565b6040516001600160e01b031960e085901b1681526001600160a01b03928316600482015291166024820152604481018590526064810184905260a06084820152600060a482015260c401600060405180830381600087803b15801561041c57600080fd5b505af1158015610430573d6000803e3d6000fd5b50505050505050565b6001546001600160a01b031633146104635760405162461bcd60e51b815260040161027390610e11565b61046d6000610839565b565b6000858152600260205260409020600301546001906001600160a01b03161561051f576000868152600260205260409081902060048082015460039092015492516370a0823160e01b81526001600160a01b0389811692820192909252919216906370a0823190602401602060405180830381865afa1580156104f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051a9190610e46565b101590505b80801561053d57506000868152600260208190526040909120015415155b156105bb576000828060200190518101906105589190610e5f565b6040516bffffffffffffffffffffffff19606089901b1660208201529091506000906034016040516020818303038152906040528051906020012090506105b682600260008b8152602001908152602001600020600201548361088b565b925050505b9695505050505050565b856105cf816108a1565b6105dd87878787878761046f565b6105fa57604051631eb49d6d60e11b815260040160405180910390fd5b6000868152600260209081526040808320815160a08101835281546001600160a01b03168152600182018054845181870281018701909552808552919492938584019390929083018282801561066f57602002820191906000526020600020905b81548152602001906001019080831161065b575b5050509183525050600282015460208083019190915260038301546001600160a01b031660408301526004909201546060909101528101515190915060009067ffffffffffffffff8111156106c6576106c6610b2e565b6040519080825280602002602001820160405280156106ef578160200160208202803683370190505b50905060005b826020015151811015610728578682828151811061071557610715610f05565b60209081029190910101526001016106f5565b5081516020830151604051631759616b60e11b81526001600160a01b0390921691632eb2c2d6916107619130918c918790600401610f56565b600060405180830381600087803b15801561077b57600080fd5b505af115801561078f573d6000803e3d6000fd5b50505050505050505050505050565b6001546001600160a01b031633146107c85760405162461bcd60e51b815260040161027390610e11565b6001600160a01b03811661082d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610273565b61083681610839565b50565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600082610898858461090c565b14949350505050565b807f0000000000000000000000000000000000000000000000000000000000000000146108e157604051632eafdb6960e01b815260040160405180910390fd5b6000546001600160a01b03163314610836576040516347322d0360e01b815260040160405180910390fd5b600081815b845181101561097857600085828151811061092e5761092e610f05565b602002602001015190508083116109545760008381526020829052604090209250610965565b600081815260208490526040902092505b508061097081610fb1565b915050610911565b509392505050565b8280548282559060005260206000209081019282156109bb579160200282015b828111156109bb5782518255916020019190600101906109a0565b506109c79291506109cb565b5090565b5b808211156109c757600081556001016109cc565b6000602082840312156109f257600080fd5b81356001600160e01b031981168114610a0a57600080fd5b9392505050565b6001600160a01b038116811461083657600080fd5b60008083601f840112610a3857600080fd5b50813567ffffffffffffffff811115610a5057600080fd5b6020830191508360208260051b8501011115610a6b57600080fd5b9250929050565b600080600080600080600060c0888a031215610a8d57600080fd5b873596506020880135610a9f81610a11565b9550604088013567ffffffffffffffff811115610abb57600080fd5b610ac78a828b01610a26565b909650945050606088013592506080880135610ae281610a11565b8092505060a0880135905092959891949750929550565b600080600060608486031215610b0e57600080fd5b8335610b1981610a11565b95602085013595506040909401359392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610b6d57610b6d610b2e565b604052919050565b600082601f830112610b8657600080fd5b813567ffffffffffffffff811115610ba057610ba0610b2e565b610bb3601f8201601f1916602001610b44565b818152846020838601011115610bc857600080fd5b816020850160208301376000918101602001919091529392505050565b60008060008060008060c08789031215610bfe57600080fd5b86359550602087013594506040870135610c1781610a11565b935060608701359250608087013567ffffffffffffffff80821115610c3b57600080fd5b610c478a838b01610b75565b935060a0890135915080821115610c5d57600080fd5b50610c6a89828a01610b75565b9150509295509295509295565b60008083601f840112610c8957600080fd5b50813567ffffffffffffffff811115610ca157600080fd5b602083019150836020828501011115610a6b57600080fd5b60008060008060008060008060a0898b031215610cd557600080fd5b8835610ce081610a11565b97506020890135610cf081610a11565b9650604089013567ffffffffffffffff80821115610d0d57600080fd5b610d198c838d01610a26565b909850965060608b0135915080821115610d3257600080fd5b610d3e8c838d01610a26565b909650945060808b0135915080821115610d5757600080fd5b50610d648b828c01610c77565b999c989b5096995094979396929594505050565b60008060008060008060a08789031215610d9157600080fd5b8635610d9c81610a11565b95506020870135610dac81610a11565b94506040870135935060608701359250608087013567ffffffffffffffff811115610dd657600080fd5b610de289828a01610c77565b979a9699509497509295939492505050565b600060208284031215610e0657600080fd5b8135610a0a81610a11565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600060208284031215610e5857600080fd5b5051919050565b60006020808385031215610e7257600080fd5b825167ffffffffffffffff80821115610e8a57600080fd5b818501915085601f830112610e9e57600080fd5b815181811115610eb057610eb0610b2e565b8060051b9150610ec1848301610b44565b8181529183018401918481019088841115610edb57600080fd5b938501935b83851015610ef957845182529385019390850190610ee0565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600081518084526020808501945080840160005b83811015610f4b57815187529582019590820190600101610f2f565b509495945050505050565b6001600160a01b0385811682528416602082015260a060408201819052600090610f8290830185610f1b565b8281036060840152610f948185610f1b565b838103608090940193909352505060008152602001949350505050565b600060018201610fd157634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220dd6d277105fcc2838d71479e09d855fd54e8edc31c1b91b51f9f1088fdcb35cc64736f6c634300080d0033";

type ERC1155PurchasesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155PurchasesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155Purchases__factory extends ContractFactory {
  constructor(...args: ERC1155PurchasesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC1155Purchases";
  }

  deploy(
    productsModuleAddress_: string,
    slicerId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155Purchases> {
    return super.deploy(
      productsModuleAddress_,
      slicerId_,
      overrides || {}
    ) as Promise<ERC1155Purchases>;
  }
  getDeployTransaction(
    productsModuleAddress_: string,
    slicerId_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      productsModuleAddress_,
      slicerId_,
      overrides || {}
    );
  }
  attach(address: string): ERC1155Purchases {
    return super.attach(address) as ERC1155Purchases;
  }
  connect(signer: Signer): ERC1155Purchases__factory {
    return super.connect(signer) as ERC1155Purchases__factory;
  }
  static readonly contractName: "ERC1155Purchases";
  public readonly contractName: "ERC1155Purchases";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155PurchasesInterface {
    return new utils.Interface(_abi) as ERC1155PurchasesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Purchases {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Purchases;
  }
}
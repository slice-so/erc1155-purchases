/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ExampleTreasuryExtensionInterface extends utils.Interface {
  contractName: "ExampleTreasuryExtension";
  functions: {
    "ETHValue(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ETHValue",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "ETHValue", data: BytesLike): Result;

  events: {};
}

export interface ExampleTreasuryExtension extends BaseContract {
  contractName: "ExampleTreasuryExtension";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ExampleTreasuryExtensionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ETHValue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  ETHValue(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    ETHValue(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    ETHValue(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ETHValue(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
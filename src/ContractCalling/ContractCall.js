import React, { useEffect, useState } from "react";
import UniversalProvider from "@walletconnect/universal-provider";
import Web3 from "web3";
import bnb from "./abi/bnb.json";
import { useAccount } from "wagmi";
const ContractCall = (props) => {
  const set = useAccount();

  const [amountValue, setAmountValue] = useState("");
  const projectId = "06cd73c01555f937a6963abee3431312";
  const contrcatAddress = "0x5393e49411470416bfebb86d7ca6fd7c1add4390";

  const WalletConnectProvider = async () => {
    let provider = await UniversalProvider.init({
      logger: "info",
      relayUrl: "ws://<relay-url>",
      projectId: projectId,
      metadata: {
        name: "Web3Modal",
        description: "Web3Modal Example",
        url: "https://web3modal.com",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
      client: undefined, // optional instance of @walletconnect/sign-client
    });
    return provider;
  };

  const callWeb3 = async () => {
    try {
      if (set?.connector?.name == "WalletConnect") {
        const pro = await WalletConnectProvider();
        pro.setDefaultChain(`eip155:${"97"}`);
        return new Web3(pro);
      } else {
        return new Web3(window?.ethereum);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const contractWriteFunction = async () => {
    try {
      let _web3Instance = await callWeb3();

      let Instance = new _web3Instance.eth.Contract(bnb, contrcatAddress);

      //   let gasLimit = await Instance?.methods
      //     .claimReward()
      //     .estimateGas({ from: props?.address });

      //   console.log("gasLimitgasLimit", gasLimit);
      const result = await Instance.methods
        .claimReward()
        .send({ from: props?.address, gas: 754444 });

      if (result?.status) {
        alert("Transation Success!");
      }
    } catch (error) {
      console.log("errorsasas", error);
    }
  };

  const participateFunction = async () => {
    try {
      let _web3Instance = await callWeb3();

      let Instance = new _web3Instance.eth.Contract(bnb, contrcatAddress);

      //participate

      //   let gasLimit = await Instance?.methods
      //     .participate()
      //     .estimateGas({ from: props?.address, value: 0 });

      //   console.log("gasLimitgasLimit", gasLimit);
      const result = await Instance.methods
        .participate()
        .send({ from: props?.address, gas: 754444 });
      if (result?.status) {
        alert("Transation Success!");
      }
    } catch (error) {}
  };

  const setBitAmount = async () => {
    try {
      let _web3Instance = await callWeb3();

      let Instance = new _web3Instance.eth.Contract(bnb, contrcatAddress);

      //bidAmount

      let gasLimit = await Instance?.methods
        .bidAmount(amountValue * 10 ** 18)
        .estimateGas({ from: props?.address, value: 0 });

      const result = await Instance.methods
        .bidAmount(amountValue * 10 ** 18)
        .send({ from: props?.address, gas: gasLimit });
      if (result?.status) {
        setAmountValue("");
        alert("Transation Success!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAmount = (e) => {
    setAmountValue(e.target.value);
  };

  return (
    <div>
      <button onClick={() => contractWriteFunction()}>Claim Reward</button>

      <br />

      <button onClick={() => participateFunction()}>Participate</button>

      <br />
      <input
        type="text"
        placeholder="enter amount"
        value={amountValue}
        onChange={handleAmount}
      />
      <button onClick={() => setBitAmount()}>BitAmount</button>
    </div>
  );
};

export default ContractCall;

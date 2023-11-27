import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const ConnectWallet = (props) => {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      props?.disConnectWallet(address);
    } else {
      props?.disConnectWallet("");
    }
  }, [address]);

  return <div>{address ? address : "connectWallet"}</div>;
};

export default ConnectWallet;

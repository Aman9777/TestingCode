// import logo from "./logo.svg";
import "./App.css";

import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bscTestnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import ConnectWallet from "./ContractCalling/ConnectWallet";
import { useState } from "react";
import ContractCall from "./ContractCalling/ContractCall";
const projectId = "06cd73c01555f937a6963abee3431312";

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [bscTestnet],
  [walletConnectProvider({ projectId }), publicProvider()]
);
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  const [address, setwaddress] = useState("");
  const { open, close } = useWeb3Modal();

  const handleConnect = () => {
    open();
  };

  const disConnectWallet = (walletAddress) => {
    setwaddress(walletAddress);
  };
  return (
    <>
      <div className="App">
        <WagmiConfig config={wagmiConfig}>
          <ConnectWallet disConnectWallet={disConnectWallet} />
          <br></br>
          {address && <ContractCall address={address} />}
          <br></br>
        </WagmiConfig>
        <button onClick={() => handleConnect()}>
          {address ? "Disconnect Wallet" : "connect"}
        </button>
      </div>
    </>
  );
}

export default App;

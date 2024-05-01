"use client";
import { useWeb3ModalTheme } from "@web3modal/ethers/react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "c80883c98188008e7300b8cdc9f68a66";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};
const sepolia = {
  chainId: 11155111,
  name: "Ethereum Sepolia (Alchemy)",
  currency: "SepoliaETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl:
    "https://eth-sepolia.g.alchemy.com/v2/VQ0WoxuRgbH4-K_Sq8Mtsg9K8O8vEzJu",
};

const hardhat = {
  chainId: 31337,
  name: "Hardhat-localhost",
  currency: "ETH",
  explorerUrl: "",
  rpcUrl: "http://127.0.0.1:8545/"
}

// 3. Create a metadata object
const metadata = {
  name: "TokenEstate",
  description: "My Website description",
  url: "http://localhost:3000", // origin must match your domain & subdomain
  icons: [],
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia, hardhat],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export function Web3Modal({ children }) {
  const { setThemeMode } = useWeb3ModalTheme();
  setThemeMode("dark");
  return children;
}

'use client'
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis"



const contractAddress = "0x69C09b2Fbf2244C77f133BA12d8B767f8C090b73"
const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "n",
                "type": "uint256"
            }
        ],
        "name": "setNum",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNum",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export default function TestFunc() {
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider();
    async function getProvider() {
        const provider = new BrowserProvider(walletProvider)
        const signer = await provider.getSigner();
        console.log(await signer.getAddress())
        console.log(await provider.listAccounts())


        if (isConnected) {
            const contract = new Contract(contractAddress, abi, signer)
            // const tx = await contract.getNum();
            const tx2 = await contract.setNum("60");
            const reciept = await tx2.wait()
            const tx3 = await contract.getNum();
            // const reciept = tx3.wait();
            // const receipt = await provider.getTransactionReceipt(tx3)
            // console.log(tx)
            console.log(reciept)
            console.log(tx3)
            // console.log(typeof(tx2))

        }
    }
    return (
        <>
            <motion.button className="btn" onClick={getProvider}>Perform Operation</motion.button>
        </>
    )
}
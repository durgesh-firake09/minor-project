'use client'

import SPV from "@/components/Dashboards/SPV";
import User from "@/components/Dashboards/User";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Navbar";
import NotFound from "@/components/NotFound";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function Dashboard() {
    const { isConnected, address } = useWeb3ModalAccount()
    console.log(process.env.NEXT_PUBLIC_SPV_WALLET_ADDRESS)
    return (
        <>
            <Navbar />
            {isConnected ?
                (
                    (address == process.env.NEXT_PUBLIC_SPV_WALLET_ADDRESS) ?
                        (
                            <SPV />
                        ) :
                        (
                            <User />

                        )
                ) :
                (
                    <NotFound/>
                )}
            <Footer />
        </>
    )
}
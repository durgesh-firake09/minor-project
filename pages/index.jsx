'use client'

import Footer from "@/components/Footer/Footer"
import RegisterProperty from "@/components/Forms/RegisterProperty"
import ConnectButton from "@/components/Header"
import Hero from "@/components/Header/Hero"
import Navbar from "@/components/Header/Navbar"
import HotProducts from "@/components/HotProducts/HotProducts"
import Spinner from "@/components/Spinner"
import TestFunc from "@/components/TestFunc"
import { useMoralis, useWeb3Contract } from "react-moralis"
// import { ConnectButton } from "../components/Header"


export default function Home() {
    const { isAuthenticated, chainId, account } = useMoralis()

    console.log(account)
    return (
        <>
            <Navbar />
            <Spinner />
            {/* <h1>Decentralized App</h1> */}
            <Hero></Hero>
            {/* <ConnectButton /> */}
            {/* <TestFunc /> */}
            <Footer />
        </>

    )

}



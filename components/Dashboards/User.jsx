'use client'
import { useWeb3ModalAccount } from "@web3modal/ethers/react"

export default function User() {
    const { address } = useWeb3ModalAccount()
    return (
        <>
            <h1 className="text-xl text-slate-100">
                Dashboard USER - {address}
            </h1>
        </>
    )
}
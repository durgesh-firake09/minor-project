'use client'

import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
const pinataSDK = require("@pinata/sdk")


export default function RegisterProperty() {
    const pinata = new pinataSDK({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT_KEY })

    const { address } = useWeb3ModalAccount()
    const [balance, setBalance] = useState("")
    const { walletProvider } = useWeb3ModalProvider()
    async function getBalance() {
        try {

            // const res = await pinata.pinFiletoIPFS(stream)
            const provider = new BrowserProvider(walletProvider)
            const signer = await provider.getSigner()
            const balance = await provider.getBalance(signer.address);
            // console.log(ethers.formatUnits(balance, 18))
            return balance;
        }
        catch (e) {
            return "-1"
        }
    }
    useEffect(() => {
        setBalance(balance)
    }, [balance])
    async function getPinata() {
        const res = await pinata.pinJSONToIPFS({ keychain: "Ssda,dmd,dndmndmnmndsdfbgfdgfngff" })
        console.log(res)
    }

    getBalance().then((dat => { setBalance(ethers.formatEther(dat)) }))
    getPinata()
    // console.log(balance)
    return (
        <>
            <div className='flex flex-col space-y-4 my-10 container w-3/4 m-auto'>
                <h3 className='text-2xl font-semibold text-slate-200'>Register Property</h3>
                <div className='flex flex-col space-y-2'>
                    <p className='text-md text-slate-300 pt-3'>
                        Name <span className='text-rose-500'>*</span>
                    </p>
                    {/* <div className=''> */}

                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Your Name'
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Wallet Address (Owner) <span className='text-rose-500'>*</span>
                    </p>
                    <div
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'


                    >{address + " - " + balance + " ETH"}</div>
                    <p className='text-md text-slate-300 pt-3'>
                        Image (SVG) <span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='file'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'

                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Dimentions (Sq. ft.)) <span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Dimensions (sq. ft.)'
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Address <span className='text-rose-500'>*</span>
                    </p>
                    <textarea
                        type='file'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Physical Address of the Property'
                    />

                    <button className='text-white font-semibold w-[15%] bg-indigo-600 p-2 rounded-md' style={{ marginTop: "20px" }}>
                        Register
                    </button>
                </div>
            </div>
        </>
    );
}
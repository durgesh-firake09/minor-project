
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
const pinataSDK = require("@pinata/sdk")


export default function RegisterProperty() {
    const pinata = new pinataSDK({ pinataJWTKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTFhMTMzYS1kNDI5LTQzNjAtOWIxZS1iYjMwNDY4MTQzNGIiLCJlbWFpbCI6ImZpcmFrZS5kdXJnZXNoODc2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4YTdhNDM4MDNiNDhmMmFkMjU2ZSIsInNjb3BlZEtleVNlY3JldCI6ImY4MmVkNDhlNDVlMThhZDAyOGI1YTc0ZWYxODY2NGQ4MGU1ZDg5MGNlNWMzZmFlZjNmMmIyN2U2OGU1OGM4OTgiLCJpYXQiOjE3MTQzMDM0NDd9.tF83uI6v1JOWs4ro9dzi-YFMnQfnMkrVEniAt7yw1jA" })

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
            <div className='flex flex-col space-y-4 container w-3/4 m-auto'>
                <h3 className='text-2xl font-semibold text-slate-200'>Register Property</h3>
                <div className='flex flex-col space-y-2'>
                    <p className='text-md text-slate-300'>
                        Name <span className='text-rose-500'>*</span>
                    </p>
                    {/* <div className=''> */}

                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Your Name'
                    />
                    <p className='text-md text-slate-300'>
                        Wallet Address (Owner) <span className='text-rose-500'>*</span>
                    </p>
                    <div
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'


                    >{address + " - " + balance + " ETH"}</div>
                    <p className='text-md text-slate-300'>
                        Image (SVG) <span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='file'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'

                    />
                    <p className='text-md text-slate-300'>
                        Dimentions (Sq. ft.)) <span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Dimensions (sq. ft.)'
                    />
                    <p className='text-md text-slate-300'>
                        Address <span className='text-rose-500'>*</span>
                    </p>
                    <textarea
                        type='file'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Physical Address of the Property'
                    />

                    <button className='text-white font-semibold bg-indigo-600 p-2 rounded-md'>
                        Register
                    </button>
                </div>
            </div>
        </>
    );
}
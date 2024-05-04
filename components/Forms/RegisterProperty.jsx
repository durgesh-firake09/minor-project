'use client'

import { createClient } from '@supabase/supabase-js';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, ethers } from 'ethers';
// import { create } from 'ipfs-http-client'
import React, { useEffect, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import Spinner from '../Spinner';
import { supabase } from '../supabase';
const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
// const ipfs = create({ host: "127.0.0.1", port: 8080, protocol: "http" });
export default function RegisterProperty() {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [uAddress, setUAddress] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    // const [photo, setPhoto] = useState(null)

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


    async function getPinata(obj) {
        const res = await pinata.pinJSONToIPFS(obj)
        return res;
    }
    // setLoading(false)

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        console.log(file)
        // const obj = pinata
    };

    const handleSubmit = async () => {

        // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        // const photoBuffer = await photo.arrayBuffer();
        // console.log(photoBuffer)
        const obj = { name: name, email: email, address: address, uAddress: uAddress, dimensions: dimensions }
        console.log(obj)

        // const res = await getPinata(obj)
        // const file = fs.createReadStream(photo)
        setLoading(true)
        const res = await pinata.pinJSONToIPFS(obj)
        const { data, error } = await supabase.from("properties").insert([{
            name: name,
            email: email,
            wallet: address,
            state: uAddress,
            price: 10,
            tokenURI: "ipfs://" + res.IpfsHash,

        }])
        console.log(data)
        console.log(error)


        // write in database (obj and res.IpfsHash)

        setLoading(false)
        console.log(res)
    }

    getBalance().then((dat => { setBalance(ethers.formatEther(dat)) }))
    // getPinata()
    // console.log(balance)
    if (loading) {
        return (
            <>
                <Spinner />
            </>
        )
    }
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
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Email <span className='text-rose-500'>*</span>
                    </p>
                    {/* <div className=''> */}

                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Your Email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Wallet Address (Owner) <span className='text-rose-500'>*</span>
                    </p>
                    <div
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'


                    >{address + " - " + balance + " ETH"}</div>
                    {/* <p className='text-md text-slate-300 pt-3'>
                        Image (SVG) <span className='text-rose-500'>*</span>
                    </p>/
                    <input
                        type='file'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        onChange={handlePhotoChange}

                    /> */}
                    <p className='text-md text-slate-300 pt-3'>
                        Dimentions (Sq. ft.) <span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Dimensions (sq. ft.)'
                        onChange={(e) => { setDimensions(e.target.value) }}
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Price<span className='text-rose-500'>*</span>
                    </p>
                    <input
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Dimensions (sq. ft.)'
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Address <span className='text-rose-500'>*</span>
                    </p>
                    <textarea
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Physical Address of the Property'
                        onChange={(e) => { setUAddress(e.target.value) }}
                    />
                    <p className='text-md text-slate-300 pt-3'>
                        Description <span className='text-rose-500'>*</span>
                    </p>
                    <textarea
                        type='text'
                        className='p-2 bg-slate-700 rounded-sm text-slate-100 flex space-x-1 items-center'
                        placeholder='Enter Physical Address of the Property'
                        onChange={(e) => { setDescription(e.target.value) }}
                    />

                    <button onClick={handleSubmit} className='text-white font-semibold w-[15%] bg-indigo-600 p-2 rounded-md' style={{ marginTop: "20px" }}>
                        Register
                    </button>
                </div>
            </div>
        </>
    );
}
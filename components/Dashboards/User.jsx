'use client'

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
// import Modal from "../Modal"
import DemoModal from "../Modal"
import { BrowserProvider, Contract, ethers } from "ethers"
import { useEffect, useState } from "react"
import data from "./data.json"
import Spinner from "../Spinner"
import { supabase } from "../supabase"

export default function User() {
    // console.log(data.data)
    const [loading, setLoading] = useState(true)
    const [data0, setData] = useState([])
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const abi = [
        {
            "inputs": [],
            "name": "SPV__AlreadyListed",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "SPV__NoProceeds",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "SPV__NotApprovedForMarketPlace",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "SPV__NotListed",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "SPV__NotOwner",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "SPV__PriceMustBeAboveZero",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddres",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "SPV__PriceNotMet",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "SPV__TransferFailed",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "ItemBought",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ItemCanceled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "ItemListed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "buyProperty",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "cancelListing",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getListing",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct SPV.Listing",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                }
            ],
            "name": "getProceeds",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "listProperty",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updateListing",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawProceeds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const viewPropertyDetails = (obj) => {
        console.log(obj)
    }
    const { address } = useWeb3ModalAccount()
    const getData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("properties").select("*").eq("wallet", address)
        // setData()
        console.log(data);
        setData(data)
        setLoading(false)
        return 1;
    }
    useEffect(() => {
        getData()
    }, [])


    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider();
    const listProperty = async (obj) => {
        setLoading(true)
        // fetch entry from db
        const provider = new BrowserProvider(walletProvider)
        const signer = await provider.getSigner();

        if (isConnected) {
            const contract = new Contract(contractAddress, abi, signer)
            // const tx = await contract.listProperty(tokenAddress, obj.tokenID, obj.price)
            const tx = await contract.listProperty(tokenAddress, obj.tokenID,obj.price)
            console.log(contract)
            console.log(obj)
            // const tx = await contract.getListing(tokenAddress, obj.tokenID)
            // const tx = await contract.getProceeds(address)
            // const tx = await contract.ownerOf("1")
            // const tx = await contract.getTokenCounter()
            // const tx = await contract.tokenURI("1")
            const receipt = await tx.wait(1);
            console.log(receipt)
            await supabase.from("properties").update({ status: "Listed", price: obj.price }).eq("id", obj.id)

            // console.log(tx)

            // console.log(typeof(tx2))


        }
        setLoading(false)
    }

    // const obj = {
    //     'red': "Pending",
    //     "green": "Issued"
    // }
    if (loading) {
        return (<>
            <Spinner />
        </>)
    }
    return (
        <>


            <div>
                <section class=" bg-slate-900 my-10 text-gray-600 h-sc">
                    <h1 className="text-xl font-semibold text-slate-200 m-10">User - {address}</h1>
                    <div class="h-full">

                        <div class="w-[80%] mx-auto shadow-lg rounded-sm border border-slate-800 bg-slate-900">
                            <header class="px-5 py-4 border-b border-slate-800">
                                <h2 class="font-semibold text-gray-100">Customers</h2>
                            </header>
                            <div class="p-3">
                                <div class="overflow-x-auto">
                                    <table class="table-auto bg-slate-900 w-full">
                                        <thead class="text-xs font-semibold uppercase text-gray-200 bg-slate-900">
                                            <tr>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Name</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Email</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">Price</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-left">State</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">Wallet</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-cente">Status</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">Action</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-sm divide-y divide-slate-800">



                                            {data0.map(obj => {
                                                return (
                                                    <tr>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="flex items-center">
                                                                <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov" /></div>
                                                                <div class="font-medium text-gray-100">{obj.name}</div>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left">{obj.email}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left font-medium text-green-500">{obj.price} ETH</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-left">{obj.state}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-center">{address.substring(0, 5) + "..." + address.substring(address.length - 3, address.length)}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class=" text-center">
                                                                <span className={"rounded-full bg-" + (obj.status == "Pending" ? "red" : "green") + "-500 px-2 py-0.5 text-slate-100"}>{obj.status}</span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-center">
                                                                <button className="mr-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" onClick={() => { listProperty(obj) }}>
                                                                    {/* <DemoModal /> */}
                                                                    Apply Listing
                                                                </button>
                                                                {/* <button className="ml-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" onClick={() => viewPropertyDetails(obj)}>View</button> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}






                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
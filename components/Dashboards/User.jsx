'use client'

import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
// import Modal from "../Modal"
import DemoModal from "../Modal"
import { BrowserProvider, Contract, ethers } from "ethers"
import { useEffect, useState } from "react"
import data from "./data.json"
import Spinner from "../Spinner"
import { supabase } from "../supabase"
import Link from "next/link"

export default function User() {
    // console.log(data.data)
    const [loading, setLoading] = useState(true)
    const [data0, setData] = useState([])
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const abi = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_mintFee",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "ERC721IncorrectOwner",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ERC721InsufficientApproval",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "approver",
              "type": "address"
            }
          ],
          "name": "ERC721InvalidApprover",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "ERC721InvalidOperator",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "ERC721InvalidOwner",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            }
          ],
          "name": "ERC721InvalidReceiver",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "ERC721InvalidSender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ERC721NonexistentToken",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Token__AlreadyListed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Token__NeedMoreETH",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Token__NotOwner",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenID",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "name": "Token__PriceNotMet",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_fromTokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_toTokenId",
              "type": "uint256"
            }
          ],
          "name": "BatchMetadataUpdate",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenID",
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
              "indexed": false,
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenID",
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
              "indexed": false,
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "MetadataUpdate",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "tokenID",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "name": "PropertyListed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
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
              "internalType": "uint256",
              "name": "tokenID",
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
              "internalType": "uint256",
              "name": "tokenID",
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
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenID",
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
              "internalType": "struct Token.Listing",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getMintFee",
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
          "inputs": [],
          "name": "getTokenCounter",
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
              "internalType": "uint256",
              "name": "tokenID",
              "type": "uint256"
            }
          ],
          "name": "getTokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenID",
              "type": "uint256"
            }
          ],
          "name": "isExists",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenID",
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
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "tokenURI",
              "type": "string"
            }
          ],
          "name": "mint",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
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
    }, [address])


    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider();

    const cancelListing = async (obj) => {
        setLoading(true);
        const provider = new BrowserProvider(walletProvider)
        const signer = await provider.getSigner();

        if (isConnected) {
            const contract = new Contract(contractAddress, abi, signer)
            // const tx = await contract.listProperty(tokenAddress, obj.tokenID, obj.price)
            const tx = await contract.cancelListing(obj.tokenID)
            // const tx = await contract.getListing("1")
            const receipt = await tx.wait(1)
            console.log(receipt)
            // console.log(tx)
            await supabase.from("properties").update({ status: "Token Issued" }).eq("id", obj.id)
            getData()
            setLoading(false)

        }
    }

    const listProperty = async (obj) => {
        setLoading(true)
        // fetch entry from db
        const provider = new BrowserProvider(walletProvider)
        const signer = await provider.getSigner();

        if (isConnected) {
            const contract = new Contract(contractAddress, abi, signer)
            // const tx = await contract.listProperty(tokenAddress, obj.tokenID, obj.price)
            const tx = await contract.listProperty(obj.tokenID, obj.price)
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
            await getData()

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
                <section class=" bg-slate-900 my-10 text-gray-600 h-screen">
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
                                                    <div class="font-semibold text-center">URI</div>
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
                                                                <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="assets/home.jpg" width="40" height="40" alt="Alex Shatov" /></div>
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
                                                            <div class="text-center">{obj.wallet.substring(0, 5) + "..." + obj.wallet.substring(obj.wallet.length - 3, obj.wallet.length)}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-center">{obj.tokenURI}</div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class=" text-center">
                                                                <span className={"rounded-full bg-" + (obj.status == "Pending" ? "red" : "green") + "-500 px-2 py-0.5 text-slate-100"}>{obj.status}</span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 whitespace-nowrap">
                                                            <div class="text-center">

                                                                {obj.status == "Listed" ? <button className="mr-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" onClick={() => { cancelListing(obj) }}>Cancel Listing</button> : <button className="mr-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" onClick={() => { listProperty(obj) }}>
                                                                    {/* <DemoModal /> */}
                                                                    Apply Listing
                                                                </button>}

                                                                <Link className="ml-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded" href={"/view?tokenId=" + obj.id}>View</Link>

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
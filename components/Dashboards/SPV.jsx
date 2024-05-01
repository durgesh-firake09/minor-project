'use client'

import { useWeb3ModalAccount } from "@web3modal/ethers/react"
// import Modal from "../Modal"
import DemoModal from "../Modal"

export default function SPV() {
    const { address } = useWeb3ModalAccount()
    const obj = {
        'red': "Pending",
        "green": "Issued"
    }
    return (
        <>
            <h1 className="text-xl text-slate-100">
                {/* Dashboard SPV - {address} */}
            </h1>

            <div>
                <section class=" bg-slate-900 my-10 text-gray-600">
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
                                                    <div class="font-semibold text-center">State</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">Country</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">Status</div>
                                                </th>
                                                <th class="p-2 whitespace-nowrap">
                                                    <div class="font-semibold text-center">Action</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-sm divide-y divide-slate-800">
                                            <tr>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov" /></div>
                                                        <div class="font-medium text-gray-100">Alex Shatov</div>
                                                    </div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-left">alexshatov@gmail.com</div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-left font-medium text-green-500">100 ETH</div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-lg text-center">🇺🇸</div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-lg text-center">🇺🇸</div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class=" text-center">
                                                        <span class="rounded-full bg-red-500 px-2 py-0.5 text-slate-100">Pending</span>
                                                    </div>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <div class="text-center">
                                                        <button className="mr-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded">
                                                            {/* <DemoModal /> */}
                                                            Issue Token
                                                        </button>
                                                        <button className="ml-1 bg-transparent hover:bg-slate-700 text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded">View</button>
                                                    </div>
                                                </td>
                                            </tr>


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
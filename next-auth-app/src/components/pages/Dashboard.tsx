"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useUserContextHook } from '@/context/useUserContextHook';
import Link from 'next/link';
import Image from 'next/image';
import picture from "../assets/default.jpg"
import Sidebar from '../sidebar/Sidebar';

const Dashboard = () => {
    const { getUserDetails } = useUserContextHook()
    const [data, setData] = useState<any>("");


    useEffect(() => {
        const fetch = async () => {
            const res = await getUserDetails()
            setData(res)
        }
        fetch()
    }, [])




    return (
        <div className="bg-gray-950 min-h-screen text-white relative w-full">

            <div className='block md:hidden' ><Navbar /></div>
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                <div className=" w-full  px-4 md:px-6 mt-2">

                    {/* Separate Navbar */}
                    <div className="w-full flex items-center justify-between  gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4 md:p-6 mb-6 shadow-lg">

                        <h1 className="text-xl md:text-3xl font-bold">
                            Welcome, {data?.username} 👋
                        </h1>

                        <Image
                            className="object-cover h-12 w-12 md:h-14 md:w-14 rounded-full cursor-pointer"
                            src={picture.src}
                            height={50}
                            width={50}
                            alt="profile picture"
                        />

                    </div>


                    {/* User Info */}
                    {data && (
                        <div className="w-full max-w-3xl bg-gray-900 text-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800">

                            <h2 className="text-xl font-semibold mb-6">
                                User Information
                            </h2>

                            <div className="space-y-4 text-left">

                                <div className="bg-gray-800 p-3 rounded-lg">
                                    <span className="text-gray-400 text-sm">User ID</span>
                                    <p className="font-mono text-green-400 break-all">
                                        {data._id}
                                    </p>
                                </div>

                                <div className="bg-gray-800 p-3 rounded-lg">
                                    <span className="text-gray-400 text-sm">Username</span>
                                    <p className="font-semibold">{data.username}</p>
                                </div>

                                <div className="bg-gray-800 p-3 rounded-lg">
                                    <span className="text-gray-400 text-sm">Email</span>
                                    <p>{data.email}</p>
                                </div>

                                <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
                                    <span className="text-gray-400 text-sm">Verified</span>
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${data.isVerified ? "bg-green-600" : "bg-red-600"
                                            }`}
                                    >
                                        {data.isVerified ? "Yes" : "No"}
                                    </span>
                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Dashboard
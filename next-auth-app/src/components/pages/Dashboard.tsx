"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useUserContextHook } from '@/context/useUserContextHook';
import Link from 'next/link';
import Image from 'next/image';
import picture from "../assets/default.jpg"
import Sidebar from '../sidebar/Sidebar';
import MainPage from './MainPage';

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

                    <MainPage />

                </div>

            </div>
        </div>
    )
}

export default Dashboard
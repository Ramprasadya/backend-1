"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { toast } from 'sonner';

const Dashboard = () => {
    const [data, setData] = useState<any>("");

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/users/me`)
            // console.log(response.data.data)
            setData(response.data?.data)
            
        } catch (error:any) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
       getUserDetails()
    },[])

    return (
        <div>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
                <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md">

                    <h1 className="text-2xl font-bold mb-6 text-center">
                       Welcome to Dashboard Page
                    </h1>

                    {/* User Info */}
                    {data && (
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
                    )}

                </div>
            </div>
        </div>
    )
}

export default Dashboard
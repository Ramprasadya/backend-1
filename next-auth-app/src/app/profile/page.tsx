"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message)
      router.push("/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  const [data, setData] = useState<any>("");

  const getUserDetails = async () => {
    const response = await axios.get(`/api/users/me`)
    // console.log(response.data.data)
    toast.success(response.data.message)
    setData(response.data?.data)
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Profile Page
        </h1>

        {/* User Info */}
        {data && (
          <div className="space-y-4 text-left">

            <div className="bg-gray-800 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">User ID</span>
              <p className="font-mono text-green-400 break-all">
                <Link href={`/profile/${data._id}`}>{data._id}</Link>
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

        {/* Buttons */}
        <div className="mt-6 space-y-3">

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-3 rounded-lg font-semibold 
                   hover:bg-red-700 transition duration-200 active:scale-95"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="w-full bg-green-600 py-3 rounded-lg font-semibold 
                   hover:bg-green-700 transition duration-200 active:scale-95"
          >
            Get Profile Data
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;

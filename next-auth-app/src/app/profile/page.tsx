"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Pencil, Save } from "lucide-react";

const Profile = () => {


  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");


  const [data, setData] = useState<any>("");

  const getUserDetails = async () => {
    const response = await axios.get(`/api/users/me`)
    // console.log(response.data.data)
    toast.success(response.data.message)
    setData(response.data?.data)
  }

  const handleEdit = () => {
    setIsEditing(true);
    setNewUsername(data.username);
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch("/api/updatecred", {
        email: data.email,
        username: newUsername,
      });

      toast.success(res.data.message);
      setData(res.data.data);
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating");
    }
  };

  return (
    <>
      <Navbar />
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

              <div className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                <div className="w-full">
                  <span className="text-gray-400 text-sm">Username</span>

                  {!isEditing ? (
                    <p className="font-semibold">{data.username}</p>
                  ) : (
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full mt-1 p-2 rounded bg-gray-700 outline-none"
                    />
                  )}
                </div>

                <div className="ml-3 cursor-pointer">
                  {!isEditing ? (
                    <Pencil size={18} onClick={handleEdit} />
                  ) : (
                    <Save size={18} onClick={handleSave} />
                  )}
                </div>
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
              onClick={getUserDetails}
              className="w-full bg-green-600 py-3 rounded-lg font-semibold 
                   hover:bg-green-700 transition duration-200 active:scale-95"
            >
              Get Profile Data
            </button>

          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;

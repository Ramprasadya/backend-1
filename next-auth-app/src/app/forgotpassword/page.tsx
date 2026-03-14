"use client";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  const resetPassword = async () => {
     setLoading(true)
    try {

      const response = await axios.post("/api/users/resetpassword", { email })
      toast.success(response.data.message)
      // console.log(response.data)
      setLoading(false)
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">Reset Password</h1>
            <p className="text-gray-400 text-sm mt-2">
              Enter your email and we’ll send you a reset link.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
        text-white placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        focus:border-indigo-500 transition"
            />

            <button
              onClick={resetPassword}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold
        hover:bg-indigo-700 transition duration-200 active:scale-95"
            >
              Send Reset Link
            </button>

          </div>

          {/* Back to login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Back to login
            </Link>
          </p>

        </div>
      </div>
     { loading && <Loading/>}
    </>
  );
};

export default page;

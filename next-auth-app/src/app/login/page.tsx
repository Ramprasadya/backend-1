"use client"
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    password: "",
    // username:"",
    email: ""
  })

  const [loading, setLoading] = useState<boolean>(false)

  const Login = async () => {
    setLoading(true)
    try {
       await axios.post("/api/users/login", user)
      // console.log(response.data)
      toast.success("Login Successfully")
      router.push("/dashboard")
      setLoading(false)
    } catch (error: any) {
      // console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }


  useEffect(()=>{
     const token = localStorage.getItem("token")
     if(!token){
       router.push("/dashboard")
     }
  },[])

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md bg-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-800">

          <h1 className="text-3xl font-bold text-center mb-6">
            Welcome Back
          </h1>

          <div className="flex flex-col gap-4">

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />

            <input
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />

            <button
              onClick={Login}
              className="w-full bg-indigo-600 py-3 rounded-lg font-semibold 
                   hover:bg-indigo-700 transition duration-200 active:scale-95"
            >
              Login
            </button>

            <div className="space-y-4 text-center">

              <p className="text-sm text-gray-400">
                Forgot your password?{" "}
                <Link
                  href="/forgotpassword"
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Reset Password
                </Link>
              </p>
              <p className="text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Create Account
                </Link>
              </p>

            </div>

          </div>
        </div>
        {loading && <Loading />}
      </div>
    </>
  )
}

export default page;

"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [token, setToken] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState(false)

    const verifyEmail =async()=>{
        try {
             const res = await axios.post("/api/users/verifyemail", {token})
             if(res.data.success){
                // console.log(res.data)
                 toast.success(res.data.message)
                 setVerified(true)
             }else{
                console.log("something went wrong ....")
             }

        } catch (error:any) {
            setError(true)
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
      if(token.length>0){
        verifyEmail()
      }
    },[token])

  return (
    <div className='flex flex-col min-h-screen w-full justify-center items-center py-2' >
           <h1 className='text-4xl' >  Verify Email</h1>
            <h2 className=' py-2 px-4 bg-green-500 text-white ' >{token ? `${token}` : "No Token "}</h2>
            {
                verified && (
                    <div>
                        <h2 className='text-2xl'>Email Verified</h2>
                        <Link href="/login">Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div>
                        <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                        
                    </div>
                )
            }
    </div>
  )
}

export default page
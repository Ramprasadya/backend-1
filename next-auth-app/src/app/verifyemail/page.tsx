"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [token, setToken] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [error, setError] = useState(false)

    const verifyEmail =async()=>{
        try {
             await axios.post("/api/user/verifyemail", {token})
             setVerified(true)

        } catch (error) {
            setError(true)
            console.log(error)
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
            <h2 className=' py-2 px-4 bg-orange-500 text-black ' >{token ? `${token}` : "No Token "}</h2>
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
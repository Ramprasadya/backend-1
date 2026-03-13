"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState<string>("");

  const resetPassword =async()=>{
      try {
          const response = await axios.post("/api/users/resetpassword",{email})
          console.log(response.data)
      } catch (error) {
         console.log(error)
      }
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-screen w-full">
      <h1 className="text-4xl ">Reset Password</h1>
      <div className=" flex gap-2 flex-col">
        <input
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition"
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={resetPassword}
          className="w-full bg-indigo-600 py-3 rounded-lg font-semibold 
                   hover:bg-indigo-700 transition duration-200 active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default page;

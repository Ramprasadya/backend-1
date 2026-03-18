"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<any>(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response?.data?.data);

    } catch (error: any) {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("isLogin") || "false" )
    if(token){
      getUserDetails();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <main className="flex flex-col items-center justify-center px-6 py-32 text-center">

        {data ? (
          <>
            <h1 className="text-5xl font-bold tracking-tight">
              Welcome back, {data.username} 👋
            </h1>

            <p className="mt-6 max-w-xl text-zinc-400 text-lg">
              Glad to see you again! Your account is{" "}
              <span className="text-green-400 font-semibold">
                {data.isVerified ? "verified" : "not verified"}
              </span>.
            </p>

            <div className="mt-10 flex gap-4">

              <Link
                href="/profile"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-700 transition"
              >
                Go to Profile
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg border border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-900 transition"
              >
                Dashboard
              </Link>

            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold tracking-tight">
              NextAuth Authentication
            </h1>

            <p className="mt-6 max-w-xl text-zinc-400 text-lg">
              A simple authentication system built with Next.js and NextAuth.
              Sign in to access your dashboard or create an account to get started.
            </p>

            <div className="mt-10 flex gap-4">

              <a
                href="/login"
                className="rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200 transition"
              >
                Sign In
              </a>

              <a
                href="/signup"
                className="rounded-lg border border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-900 transition"
              >
                Create Account
              </a>

            </div>
          </>
        )}

      </main>

    </div>
  );
}
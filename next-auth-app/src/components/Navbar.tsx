"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
    const [token, setToken] = useState<any>(null)
    useEffect(() => {
        const t = JSON.parse(localStorage.getItem("isLogin") || "false")
        setToken(t)
    }, [])
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success(res.data.message)
            localStorage.setItem("isLogin", JSON.stringify(false))
            router.push("/login");
        } catch (error) {
            console.log("Logout failed");
        }
    };
    return (
        <nav className="w-full sticky top-0 z-50  border-b border-zinc-800 bg-black p-2">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-wide text-white"
                >
                    AuthApp
                </Link>

                {/* Nav Links */}
                {!token ? (<div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="rounded-lg px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
                    >
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                    >
                        Sign Up
                    </Link>
                </div>) : (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="rounded-lg  px-4 py-2 text-sm font-medium text-white hover:border-b border-white"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
import { useUserContextHook } from '@/context/useUserContextHook'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
     const { handleLogout, getUserDetails } = useUserContextHook()
    return (
        <div className=" w-70 min-h-screen bg-gray-900 border-r border-gray-800 p-6 hidden md:block">
            <h2 className="text-xl font-bold mb-6 text-green-400">
                Dashboard
            </h2>

            <nav className="space-y-4">

                <Link
                    href="/"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Home
                </Link>

                <Link
                    href="/profile"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Profile
                </Link>

                <Link
                    href="/"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Settings
                </Link>

                <button
                    onClick={handleLogout}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition text-red-400"
                >
                    Logout
                </button>

            </nav>
        </div>
    )
}

export default Sidebar
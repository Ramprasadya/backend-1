"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-white"
        >
          AuthApp
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );
}
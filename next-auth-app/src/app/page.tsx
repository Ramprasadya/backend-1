import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <main className="flex flex-col items-center justify-center px-6 py-32 text-center">

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

      </main>

    </div>
  );
}
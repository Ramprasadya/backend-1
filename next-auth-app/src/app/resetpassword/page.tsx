"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    // Invalid token check
    if (!token) {
      let countdown = 3;

      const interval = setInterval(() => {
        toast(
          `Invalid token. Redirecting to login page in ${countdown}s`,
          {
            position: "top-center",
            style: {
              background: "white",
              color: "black",
              padding: "8px",
              fontSize:"16px"
            }
          }
        );
        countdown--;

        if (countdown < 0) {
          clearInterval(interval);
          router.push("/");
        }
      }, 1000);

      return;
    }

    // Password mismatch
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
       setLoading(true)
      const res = await axios.post("/api/users/resetverify", {
        password,
        token,
      });

      toast.success(res.data.message);

      router.push("/login");
      setLoading(false)
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const tok = window.location.search.split("=")[1];
    setToken(tok);
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-xl shadow-lg border border-neutral-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
          >
            Reset Password
          </button>
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Page;

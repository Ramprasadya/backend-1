"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode } from "react";
import { toast } from "sonner";

interface UserContextType {
  handleLogout: () => Promise<void>;
  getUserDetails: () => Promise<void>;
}

type Props = {
    children: ReactNode
}

export const userContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: Props) => {
    const router = useRouter()
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

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/users/me`)
            // console.log(response.data)
            return response.data?.data

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <userContext.Provider value={{ handleLogout, getUserDetails }} >
            {children}
        </userContext.Provider>
    )
}

import { useContext } from "react";
import { userContext } from "./userContext";


export const useUserContextHook=()=>{
    const context = useContext(userContext)
    if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
}
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
export function useUser() {
  return useContext(UserContext);
}


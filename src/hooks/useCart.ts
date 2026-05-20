import { useContext } from "react";
import { CartContext } from "@/context/cartContet";

export function useCart() {
  return useContext(CartContext);
}

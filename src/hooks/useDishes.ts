import { useContext } from "react";
import { DishesContext } from "@/context/dishesContext";

export function useDishes() {
  return useContext(DishesContext);
}


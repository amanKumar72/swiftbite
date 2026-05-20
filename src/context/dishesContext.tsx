import type React from "react";
import {
  createContext,
  useEffect,
  useState
} from "react";
import * as SecureStore from "expo-secure-store";
import { Restaurant, Dish } from "@/constants/types";
import { dishes as defaultDishes, restaurants as defaultRestaurants } from "@/constants/dishes";

export const DishesContext = createContext({
  restaurants: [] as Restaurant[],
  dishes: [] as Dish[],
});

export function DishesProvider({ children }: { children: React.ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(defaultRestaurants);
  const [dishes, setDishes] = useState<Dish[]>(defaultDishes);
  useEffect(() => {
    loadDishes();
    loadRestaurants();
  }, []);


  async function loadDishes() {
    const savedDishes = await SecureStore.getItemAsync("dishes");
    if (savedDishes) {
      setDishes(JSON.parse(savedDishes));
    }
  }

  async function loadRestaurants() {
    const savedRestaurants = await SecureStore.getItemAsync("restaurants");
    if (savedRestaurants) {
      setRestaurants(JSON.parse(savedRestaurants));
    }
  }

  return (
    <DishesContext.Provider
      value={{
        restaurants,
        dishes,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
}

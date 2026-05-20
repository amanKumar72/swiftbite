import type React from "react";
import {
  createContext,
  useEffect,
  useState
} from "react";
import * as SecureStore from "expo-secure-store";
import { Dish } from "@/constants/types";


export const CartContext = createContext({
  cart: [] as Dish[],
  addCartItem: (item: Dish) => {},
  removeCartItem: (item: Dish) => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Dish[]>([]);
  useEffect(() => {
    loadCartItems();
  }, []);

  async function loadCartItems() {
    const savedCart = await SecureStore.getItemAsync("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }

  async function addCartItem(item: Dish) {
    const nextCart = [...cart, item];
    setCart(nextCart);
    await SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }

  async function removeCartItem(item: Dish) {
    const nextCart = cart.filter((i) => i.id !== item.id);
    setCart(nextCart);
    await SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import { CartItem } from "@/constants/types";
import * as SecureStore from "expo-secure-store";
import type React from "react";
import { createContext, useEffect, useState } from "react";
 
export const CartContext = createContext({
  cart: [] as CartItem[],
  addCartItem: (item: CartItem) => {},
  removeCartItem: (dishId: string) => {},
  findCartItemByDishId: (dishId: string) => undefined as CartItem | undefined,
  increaseQuantity: (dishId: string) => {},
  decreaseQuantity: (dishId: string) => {},
});
 
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    loadCartItems();
  }, []);
 
  async function loadCartItems() {
    const savedCart = await SecureStore.getItemAsync("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }
  function findCartItemByDishId(dishId: string) {
    return cart.find((i) => i.dishId === dishId);
  }
  function increaseQuantity(dishId: string) {
    const nextCart = cart.map((i) => (i.dishId === dishId ? { ...i, quantity: i.quantity + 1 } : i));
    setCart(nextCart);
    SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }
  function decreaseQuantity(dishId: string) {
    const nextCart = cart.map((i) => {
      if (i.dishId === dishId && i.quantity > 1) {
        return { ...i, quantity: i.quantity - 1 };
      }
      return i;
    });
    setCart(nextCart);
    SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }
  async function addCartItem(item: CartItem) {
    const nextCart = [...cart, item];
    setCart(nextCart);
    await SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }
 
  async function removeCartItem(dishId: string) {
    const nextCart = cart.filter((i) => i.dishId !== dishId);
    setCart(nextCart);
    await SecureStore.setItemAsync("cart", JSON.stringify(nextCart));
  }
 
  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        findCartItemByDishId,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
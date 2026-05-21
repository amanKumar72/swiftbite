import type React from "react";
import {
  createContext,
  useEffect,
  useState
} from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "@/constants/types";

export const UserContext = createContext({
  user: null as User | null,
  isLoading: true,
  setUser: async (user: User | null) => {},
  removeUser: async () => {},
  getUser: () => Promise.resolve(null as User | null),
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const savedUser = await SecureStore.getItemAsync("user");
      const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;
      setUser(parsedUser);
      return parsedUser;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  async function setUserInStorage(user: User | null) {
    if (user) {
      await SecureStore.setItemAsync("user", JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync("user");
    }
    setUser(user);
  }

  async function removeUser() {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  }
  return (
    <UserContext.Provider
      value={{
        getUser,
        isLoading,
        user,
        setUser: setUserInStorage,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

import type React from "react";
import {
  createContext,
  useEffect,
  useState
} from "react";
import { Appearance, type ColorSchemeName } from "react-native";
import * as SecureStore from "expo-secure-store";

type Theme = "light" | "dark";

export const ThemeContext = createContext({
  theme: "dark" as Theme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await SecureStore.getItemAsync("theme");
    const nextTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : "dark";

    setTheme(nextTheme);
    Appearance.setColorScheme(nextTheme as ColorSchemeName);
  }

  async function toggleTheme() {
    const nextTheme =
      theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    Appearance.setColorScheme(nextTheme);

    await SecureStore.setItemAsync("theme", nextTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

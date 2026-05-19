import { Stack } from "expo-router";
import "./global.css";
import { ThemeProvider } from "@/context/themeContext";
import Navbar from "@/components/navbar";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <ThemeProvider>
      <Stack screenOptions={{
        headerShown: false,
      }} />
    </ThemeProvider>
  );
}

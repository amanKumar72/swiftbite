import { Stack } from "expo-router";
import './global.css';
import { ThemeProvider } from "@/context/themeContext"


export default function RootLayout() {
  const isLoggedIn = false;
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          {/* <Stack.Screen name="(drawer)"  options={{headerShown:false}}/> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  )
}
import { Stack } from "expo-router";
import './global.css';
import Provider from "@/context";


export default function RootLayout() {
  const isLoggedIn = true;
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </Provider>
  )
}
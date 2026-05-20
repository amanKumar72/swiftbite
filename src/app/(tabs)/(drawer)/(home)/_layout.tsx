import { Stack } from "expo-router";


export default function RootLayout() {
  const isLoggedIn = true;
  return (
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
  )
}
import { Stack } from "expo-router";


export default function RootLayout() {

  return (
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
  )
}
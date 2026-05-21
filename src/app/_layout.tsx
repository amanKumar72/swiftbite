import { Stack } from "expo-router";
import './global.css';
import Provider from "@/context";
import { useUser } from "@/hooks/useUser";

export default function RootLayout() {
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  )
}

function RootNavigator() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;
  const isLoggedIn = !!user;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}

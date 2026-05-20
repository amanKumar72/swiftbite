import ThemeToggle from "@/components/toggle";
import { Text, View } from "react-native";

export default function SettingsTab() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ThemeToggle />
      <Text className="text-xl font-semibold text-foreground">Settings</Text>
    </View>
  );
}

import Navbar from "@/components/navbar";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
  return (
     <View className="flex-1 bg-background">
      <Navbar />
      <StatusBar />
      <Text className="text-foreground">Hello</Text>
     </View>
  );
}

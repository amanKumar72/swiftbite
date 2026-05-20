import { Text, View } from "react-native";
import { useDishes } from "@/hooks/useDishes";

export default function HomeTab() {
  const { dishes } = useDishes();
  return (
    <View className="flex-1 bg-background">
      <Text className="text-foreground">Hello</Text>
    </View>
  );
}

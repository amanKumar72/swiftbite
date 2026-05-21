import { useDishes } from "@/hooks/useDishes";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchTab() {
  const { dishes } = useDishes();
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDishes = dishes.filter((dish) =>
    dish.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRedirectToDish = (id: string) => {
    router.push({ pathname: "/(tabs)/(drawer)/(home)/dish/[id]", params: { id } });
  };

  const renderDishCard = ({ item }: { item: any }) => (
    <View
      className="bg-surface-container rounded-3xl overflow-hidden border border-white/5 flex flex-row h-40 mb-4 shadow-lg"
    >
      <View className="w-1/3 h-full relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 p-4 flex flex-col justify-between">
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-on-surface text-lg font-semibold">
              {item.title}
            </Text>
            <View className="flex-row items-center gap-1 bg-tertiary-container/20 px-2 py-1 rounded-lg">
              <FontAwesome name="star" size={12} color={colors.tertiary} />
              <Text className="text-tertiary text-xs font-bold">
                {item.rating.average}
              </Text>
            </View>
          </View>
          <Text className="text-secondary/60 text-xs mt-1">
            {item.cuisine} • 1.2km away
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-secondary/40 text-xs">Starting price</Text>
            <Text className="text-primary font-bold text-lg">
              ${item.price.finalPrice.toFixed(2)}
            </Text>
          </View>
          <Pressable       onPress={() => handleRedirectToDish(item.id)}
 className="w-10 h-10 bg-primary-container rounded-full items-center justify-center shadow-lg">
            <FontAwesome name="arrow-right" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background px-2 pt-4 pb-12">
      <SafeAreaView className="pb-20">
      {/* Search Section */}
      <View className="relative my-4">
        <TextInput
          className="w-full bg-surface-container rounded-full py-4 pl-12 pr-12 text-on-surface"
          placeholder="Search your favorite food"
          placeholderTextColor={colors.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome
          name="search"
          size={20}
          color={colors.secondary}
          className="absolute left-4 top-1/2 -translate-y-1/2"
        />
      </View>

      <FlatList
        data={filteredDishes}
        renderItem={renderDishCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-secondary/60">No dishes found</Text>
          </View>
        }
      />
    </SafeAreaView>
    </View>
  );
}

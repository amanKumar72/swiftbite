import { useDishes } from "@/hooks/useDishes";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const randomNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley"];

export default function HomeTab() {
  const { dishes } = useDishes();
  const { colors } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userName] = useState(
    randomNames[Math.floor(Math.random() * randomNames.length)],
  );

  const categories = ["All", "Pizza", "Burgers", "Pasta", "Snacks", "Drinks"];

  const popularDishes = dishes.filter((dish) => dish.isFeatured);
  const recommendedDishes = dishes;

  const handleRedirectToDish = (id: string) => {
    router.push({ pathname: "/dish/[id]", params: { id } });
  };

  const renderPopularCard = ({ item }: { item: any }) => (
    <Pressable onPress={() => handleRedirectToDish(item.id)} className="w-[280px] bg-surface-container rounded-3xl overflow-hidden border border-white/5 shadow-xl mr-4">
      <View className="h-44 relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <Pressable className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full items-center justify-center">
          <FontAwesome name="heart" size={20} color="white" />
        </Pressable>
      </View>
      <View className="p-4 space-y-2">
        <Text className="text-on-surface text-lg font-semibold">
          {item.title}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <FontAwesome name="hourglass" size={14} color={colors.secondary} />
            <Text className="text-secondary/60 text-xs">
              {item.preparationTime}
            </Text>
          </View>
          <Text className="text-primary font-bold text-lg">
            ${item.price.finalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const renderRecommendedCard = ({ item }: { item: any }) => (
    <View className="bg-surface-container rounded-3xl overflow-hidden border border-white/5 flex flex-row h-40 mb-4 shadow-lg">
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
          <Pressable onPress={() => handleRedirectToDish(item.id)} className="w-10 h-10 bg-primary-container rounded-full items-center justify-center shadow-lg">
            <FontAwesome
              name="arrow-right"
              size={20}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background h-screen">
      <ScrollView className="flex-1 px-5">
        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-5 px-5 my-1"
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full mr-3 ${
                selectedCategory === category
                  ? "bg-primary-container"
                  : "bg-surface-container"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-secondary/60"
                }`}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Popular this week */}
        <View className="space-y-4">
          <View className="flex-row justify-between items-end">
            <Text className="text-on-surface text-2xl mb-2 font-semibold">
              Popular this week
            </Text>
            <Pressable>
              <Text className="text-primary text-sm font-medium">See all</Text>
            </Pressable>
          </View>
          <FlatList
            data={popularDishes}
            renderItem={renderPopularCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="-mx-5 px-5"
          />
        </View>

        {/* Recommended for you */}
        <View className="space-y-4">
          <View className="flex-row justify-between items-end">
            <Text className="text-on-surface text-2xl my-2 font-semibold">
              Recommended for you
            </Text>
            <Pressable>
              <Text className="text-primary text-sm font-medium">See all</Text>
            </Pressable>
          </View>
          <FlatList
            data={recommendedDishes}
            renderItem={renderRecommendedCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

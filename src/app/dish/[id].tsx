import { useCart } from "@/hooks/useCart";
import { useDishes } from "@/hooks/useDishes";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { AddonType, PortionType } from "@/constants/types";
import { SafeAreaView } from "react-native-safe-area-context";
const Dish = () => {
  const { id } = useLocalSearchParams();
  const { getDishById, getRestaurantById } = useDishes();
  const { colors } = useTheme();
  const router = useRouter();
  const { addCartItem, findCartItemByDishId } = useCart();
  const dish = getDishById(id as string);

  if (!dish) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-on-surface">Dish not found</Text>
      </View>
    );
  }

  const [selectedPortion, setSelectedPortion] = useState<PortionType>(dish?.sizes.find((size) => size.price === dish.price.base) || {name: "", price: 0});
  const [selectedToppings, setSelectedToppings] = useState<AddonType[]>([]);

  const calculateTotal = () => {
    const toppingPrice = selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
    const portionPrice = selectedPortion.price*(100-(dish?.price?.discount || 0))/100;
    return (toppingPrice + portionPrice).toFixed(2);
  };

  const toggleTopping = ({name, price}: AddonType) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.name === name)
        ? prev.filter((t) => t.name !== name)
        : [...prev, { name, price }],
    );
  };

  const handleAddToCart = () => {
    const existingItem = findCartItemByDishId(dish.id);
    if (existingItem) {
      router.push("/(tabs)/(drawer)/cart");
      return;
    }
    const restaurant = getRestaurantById(dish.restaurantId);
    addCartItem({
      dishId: dish.id,
      restaurantId: dish.restaurantId,
      size: selectedPortion,
      quantity: 1,
      addons: selectedToppings,
      finalPrice: parseFloat(calculateTotal()),
      deliveryFee: restaurant?.delivery?.deliveryFee || 0,
      deliveryTime: (restaurant?.delivery?.estimatedTime || 0) + (dish.preparationTime || 0),
      deliveryLocation: "",
    });
    router.push("/(tabs)/(drawer)/cart");
  };

  return (
    <View className="flex-1 bg-background pb-20 relative">
      {/* Top Navigation */}
          <Pressable
            onPress={() => router.back()}
            className="absolute bg-primary z-100 top-12 left-4 h-12 w-12 rounded-full items-center justify-center border border-white/10"
          >
            <FontAwesome name="arrow-left" size={24} className="text-on-primary" />
          </Pressable>

      <ScrollView className="flex-1 pb-32">
        {/* Hero Image */}
        <View className="relative w-full h-[442px] overflow-hidden">
          <Image
            source={{ uri: dish.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
        </View>

        {/* Content */}
        <View className="px-5 -mt-16 relative z-10">
          {/* Title & Rating */}
          <View className="flex-col gap-1 mb-6">
            <View className="flex-row justify-between items-end">
              <Text className="text-2xl font-bold text-foreground">
                {dish.title}
              </Text>
              <View className="flex-row gap-2">
                <Pressable className="bg-surface-container-high h-10 w-10 rounded-full items-center justify-center border border-white/5">
                  <FontAwesome name="heart" size={20} color={colors.primary} />
                </Pressable>
                <Pressable className="bg-surface-container-high h-10 w-10 rounded-full items-center justify-center border border-white/5">
                  <FontAwesome
                    name="location-arrow"
                    size={20}
                    color={colors.onSurfaceVariant}
                  />
                </Pressable>
              </View>
            </View>
            <View className="flex-row items-center gap-1">
              <FontAwesome name="star" size={18} color={colors.tertiary} />
              <Text className="text-sm font-semibold text-tertiary">
                {dish.rating.average}{" "}
                <Text className="text-on-surface-variant font-normal">
                  ({dish.rating.totalReviews} reviews)
                </Text>
              </Text>
            </View>
          </View>

          {/* Price */}
          <View className="mb-8">
            <Text className="text-4xl font-bold text-primary-container">
              ${dish.price.finalPrice.toFixed(2)}
            </Text>
            {dish.price.discount > 0 && (
              <Text className="text-sm text-on-surface-variant">
                Original: ${dish.price.base.toFixed(2)} (-{dish.price.discount}%)
              </Text>
            )}
          </View>

          {/* Details */}
          <View className="mb-8">
            <Text className="text-sm font-semibold text-on-surface-variant mb-2">
              Details
            </Text>
            <Text className="text-base text-secondary leading-relaxed">
              {dish.description}
            </Text>
          </View>

          {/* Portion Size */}
          <View className="mb-8">
            <Text className="text-sm font-semibold text-on-surface-variant mb-4">
              Choose portion size
            </Text>
            <View className="flex-row gap-2">
              {dish.sizes.map((size) => (
                <Pressable
                  key={size.name}
                  onPress={() => setSelectedPortion(size)}
                  className={`flex-1 items-center justify-center py-3 rounded-xl border ${
                    selectedPortion.name === size.name
                      ? "bg-primary-container border-primary-container/20 shadow-lg"
                      : "bg-surface-container-high border-white/5"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedPortion.name === size.name
                        ? "text-white"
                        : "text-on-surface"
                    }`}
                  >
                    {size.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Additional Toppings */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-on-surface-variant mb-4">
              Additional toppings
            </Text>
            <View className="gap-2">
              {dish.addons.map((topping) => (
                <Pressable
                  key={topping.name}
                  onPress={() => toggleTopping(topping)}
                  className="flex-row items-center justify-between p-4 bg-surface-container-low rounded-xl border border-white/5"
                >
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden">
                      <Image
                        source={{ uri: topping?.image || "" }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-semibold text-on-surface">
                        {topping.name}
                      </Text>
                      <Text className="text-xs text-on-surface-variant">
                        {topping.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <FontAwesome
                    name={
                      selectedToppings.find((t) => t.name === topping.name)
                        ? "check-circle"
                        : "circle-o"
                    }
                    size={24}
                    color={colors.primary}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-xl h-24 flex-row items-center justify-between px-5 border-t border-white/10 z-50">
        <View className="flex-col">
          <Text className="text-xs text-on-surface-variant">Total</Text>
          <Text className="text-xl font-bold text-on-surface">
            ${calculateTotal()}
          </Text>
        </View>
        <Pressable onPress={()=>handleAddToCart()} className="bg-primary-container px-8 py-4 rounded-full shadow-lg">
          <Text className="text-sm font-bold text-white">
            Add to cart
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Dish;

import { CartItem } from "@/constants/types";
import { useCart } from "@/hooks/useCart";
import { useDishes } from "@/hooks/useDishes";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeCartItem } = useCart();
  const { getDishById, getRestaurantById } = useDishes();
  const { colors } = useTheme();
  const { user } = useUser();
  const router = useRouter();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.finalPrice * item.quantity;
      return total + itemPrice;
    }, 0);
  };

  const calculateDeliveryFee = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.deliveryFee || 0), 0);
  };

  const deliveryFee = calculateDeliveryFee(cart);
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (dishId: string, change: number) => {
    const item = cart.find((i) => i.dishId === dishId);
    if (!item) return;

    if (change === 1) {
      increaseQuantity(dishId);
    } else if (change === -1) {
      if (item.quantity === 1) {
        removeCartItem(dishId);
      } else {
        decreaseQuantity(dishId);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <FontAwesome
          name="shopping-cart"
          size={64}
          color={colors.onSurfaceVariant}
        />
        <Text className="mt-4 text-lg text-on-surface">Your cart is empty</Text>
        <Pressable
          onPress={() => router.dismissAll()}
          className="mt-4 bg-primary-container px-6 py-3 rounded-full"
        >
          <Text className="text-on-primary-container font-semibold">
            Browse Dishes
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5 pt-4 pb-40">
        {/* Items Section */}
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-on-surface-variant uppercase tracking-widest mb-3">
            Items
          </Text>
          {cart.map((item) => {
            const dish = getDishById(item.dishId);
            if (!dish) return null;

            const itemPrice = item.finalPrice * item.quantity;

            return (
              <View
                key={item.dishId}
                className="bg-surface-container/50 backdrop-blur-xl rounded-xl overflow-hidden flex-row items-center p-3 gap-3 mb-3 border border-white/5"
              >
                <View className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                  <Image
                    source={{ uri: dish.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="grow flex-col justify-between ">
                  <View className="flex-row items-center justify-between mb-2">
                    <View>
                      <Text className="text-base font-semibold text-on-surface">
                        {dish.title}
                      </Text>
                      <Text className="text-xs text-on-surface-variant">
                        {item.size.name} Portion
                      </Text>
                    </View>
                    <View className="flex-row items-center bg-surface-container rounded-full px-2 py-1 border border-white/5">
                      <Pressable
                        onPress={() => handleQuantityChange(item.dishId, -1)}
                        className="w-7 h-7 items-center justify-center"
                      >
                        <FontAwesome
                          name="minus"
                          size={16}
                          color={colors.onSurfaceVariant}
                        />
                      </Pressable>
                      <Text className="w-7 text-center font-bold text-on-surface">
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => handleQuantityChange(item.dishId, 1)}
                        className="w-7 h-7 items-center justify-center"
                      >
                        <FontAwesome
                          name="plus"
                          size={16}
                          color={colors.onSurfaceVariant}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-sm font-medium text-on-surface-variant">
                        Delivery Time
                      </Text>
                      <Text className="text-lg font-bold text-primary mr-5">
                        {item.deliveryTime} min
                      </Text>
                    </View>
                    <View>
                      <Text className="text-sm font-medium text-on-surface-variant">
                        Delivery Fee
                      </Text>
                      <Text className="text-lg font-bold text-primary mr-5">
                        ${item.deliveryFee.toFixed(2)}
                      </Text>
                    </View>
                    <View >
                      <Text className="text-sm font-medium text-on-surface-variant">
                        Total
                      </Text>
                      <Text className="text-lg font-bold text-primary mr-5">
                        ${(itemPrice + item.deliveryFee).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery Context */}
        <View className="grid grid-cols-2 gap-3 mb-6">
          <View className="bg-surface-container/50 backdrop-blur-xl rounded-xl p-4 border border-white/5">
            <View className="flex-row items-center gap-2 mb-2">
              <FontAwesome name="map-marker" size={18} color={colors.primary} />
              <Text className="text-xs font-semibold text-primary uppercase tracking-wider">
                Delivery to
              </Text>
            </View>
            {
              user?.address?.street ? (
                <View className="flex flex-col gap-1">
                  <Text className="text-base font-semibold text-on-surface">
                    {user?.address?.street}
                  </Text>
                  <Text className="text-base font-semibold text-on-surface">
                    {user?.address?.city}, {user?.address?.state} {user?.address?.country} ({user?.address?.zipCode})
                  </Text>
                </View>
              ) : (
                <Text className="text-base font-semibold text-on-surface">
                  Unknown Location
                </Text>
              )
            }
          </View>
        </View>

        {/* Bill Summary */}
        <View className="bg-surface-container/50 backdrop-blur-xl rounded-xl p-4 mb-6 border border-white/5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base text-on-surface-variant">Subtotal</Text>
            <Text className="text-base text-on-surface-variant">
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base text-on-surface-variant">
              Delivery Fee
            </Text>
            <Text className="text-base text-on-surface-variant">
              ${deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View className="h-px bg-white/5 w-full my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-on-surface">Total</Text>
            <Text className="text-2xl font-bold text-primary">
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Proceed to Checkout Button */}
        <Pressable className="w-full bg-primary-container h-14 rounded-xl flex-row items-center justify-center gap-2 ">
          <Text className="text-on-primary font-semibold text-lg">
            Proceed to Checkout
          </Text>
          <FontAwesome name="arrow-right" size={20} color="white" />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Cart;

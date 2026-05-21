import { useCart } from "@/hooks/useCart";
import { useDishes } from "@/hooks/useDishes";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderTab() {
  const { cart } = useCart();
  const { getDishById, getRestaurantById } = useDishes();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const prepareOrderData = () => {
    return cart.map((item) => {
      const dish = getDishById(item.dishId);
      const restaurant = getRestaurantById(dish?.restaurantId || "");
      return {
        dish,
        restaurant,
        ...item,
      };
    });
  };
  const orderData = prepareOrderData();

  const OrderCard = ({ order }: { order: any }) => (
    <View className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-4 mb-4 shadow-lg">
      {/* Restaurant Header */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: order.restaurant?.logo || order.dish?.image }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold text-on-surface">
            {order.restaurant?.name || "Restaurant"}
          </Text>
          <View className="flex-row items-center mt-1">
            <FontAwesome name="star" size={12} color="#ff6b00" />
            <Text className="text-sm text-on-surface-variant ml-1">
              {order.restaurant?.rating?.average || 4.5} (
              {order.restaurant?.rating?.totalReviews || 100})
            </Text>
          </View>
        </View>
        <View className="bg-primary/20 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-primary">
            {order.restaurant?.isOpen ? "Open" : "Closed"}
          </Text>
        </View>
      </View>

      {/* Dish Info */}
      <View className="flex-row mb-3">
        <Image
          source={{ uri: order.dish?.image }}
          className="w-20 h-20 rounded-lg mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-base font-semibold text-on-surface mb-1">
            {order.dish?.title}
          </Text>
          <Text
            className="text-sm text-on-surface-variant mb-2"
            numberOfLines={2}
          >
            {order.dish?.shortDescription}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-sm font-semibold text-primary">
              ${order.finalPrice?.toFixed(2) || "0.00"}
            </Text>
            {order.dish?.price?.discount && (
              <Text className="text-sm text-on-surface-variant line-through ml-2">
                ${order.dish?.price?.base?.toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Order Details */}
      <View className="bg-surface-container-low rounded-lg p-3 mb-3">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-on-surface-variant">Size</Text>
          <Text className="text-sm font-medium text-on-surface">
            {order.size?.name || "Medium"}
          </Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-on-surface-variant">Quantity</Text>
          <Text className="text-sm font-medium text-on-surface">
            {order.quantity || 1}
          </Text>
        </View>
        {order.addons && order.addons.length > 0 && (
          <View className="mb-2">
            <Text className="text-sm text-on-surface-variant mb-1">
              Add-ons
            </Text>
            <View className="flex flex-wrap gap-2">
              {order.addons.map((addon: any, index: number) => (
                <View
                  key={index}
                  className="bg-surface-container px-2 py-1 rounded-md"
                >
                  <Text className="text-xs text-on-surface">
                    {addon.name} (+${addon.price?.toFixed(2)})
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Delivery Info */}
      <View className="flex-row items-center justify-between bg-surface-container-low rounded-lg p-3">
        <View className="flex-row items-center">
          <FontAwesome name="truck" size={16} color={colors.primary} />
          <View className="ml-2">
            <Text className="text-xs text-on-surface-variant">Delivery</Text>
            <Text className="text-sm font-medium text-on-surface">
              {order.deliveryTime || 30} mins
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <FontAwesome name="map-marker" size={16} color={colors.primary} />
          <View className="ml-2">
            <Text className="text-xs text-on-surface-variant">Fee</Text>
            <Text className="text-sm font-medium text-on-surface">
              ${order.deliveryFee?.toFixed(2) || "0.00"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-background">
      <SafeAreaView>
        <View className="min-h-screen px-4 py-6">
         {/* Decorative Background */}
        <View className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
          <View className="absolute top-[-10%] right-[-10%] w-150 h-150 rounded-full bg-primary/20 blur-[120px]" />
          <View className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-tertiary/10 blur-[100px]" />
        </View>

        {/* Header */}
        <View className="mb-6 z-10">
          <Text className="text-3xl font-bold text-on-surface mb-2">
            My Orders
          </Text>
          <Text className="text-base text-on-surface-variant">
            Track and manage your food deliveries
          </Text>
        </View>

        {/* Orders List */}
        <View className="z-10">
          {cart.length === 0 ? (
            <View className="flex-1 items-center justify-center py-20">
              <View className="bg-surface-container-low rounded-full p-6 mb-4">
                <FontAwesome
                  name="shopping-basket"
                  size={48}
                  color={colors.onSurfaceVariant}
                />
              </View>
              <Text className="text-xl font-semibold text-on-surface mb-2">
                No orders yet
              </Text>
              <Text className="text-base text-on-surface-variant text-center">
                Start ordering delicious food from your favorite restaurants
              </Text>
            </View>
          ) : (
            <>
              {orderData.map((order, index) => (
                <OrderCard key={`${order.dishId}-${index}`} order={order} />
              ))}
            </>
          )}
        </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

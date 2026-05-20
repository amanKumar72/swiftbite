import { useTheme } from "@/hooks/useTheme";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GlassView, isGlassEffectAPIAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import type { AndroidSymbol } from "expo-symbols";
import { SymbolView } from "expo-symbols";
import type { ReactNode } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { SFSymbol } from "sf-symbols-typescript";

const palette = {
  accent: "#8B5CF6",
  accentMuted: "rgba(139, 92, 246, 0.2)",
  barFallback: "rgba(22, 22, 27, 0.94)",
  border: "rgba(255, 255, 255, 0.1)",
  labelActive: "#FAFAFA",
  labelInactive: "#A1A1AA",
  iconInactive: "#71717A",
  shadow: "#000000",
} as const;

type TabIcon = {
  ios: SFSymbol;
  android: AndroidSymbol;
  web: AndroidSymbol;
};

const TAB_CONFIG: Record<
  string,
  { label: string; icon: TabIcon; iconActive: TabIcon }
> = {
  index: {
    label: "Home",
    icon: { ios: "house", android: "home", web: "home" },
    iconActive: { ios: "house.fill", android: "home_filled", web: "home_filled" },
  },
  search: {
    label: "Search",
    icon: { ios: "magnifyingglass", android: "search", web: "search" },
    iconActive: {
      ios: "magnifyingglass",
      android: "search",
      web: "search",
    },
  },
  order: {
    label: "Order",
    icon: { ios: "bag", android: "shopping_bag", web: "shopping_bag" },
    iconActive: {
      ios: "bag.fill",
      android: "shopping_bag",
      web: "shopping_bag",
    },
  },
  profile: {
    label: "Profile",
    icon: { ios: "person", android: "person", web: "person" },
    iconActive: {
      ios: "person.fill",
      android: "person",
      web: "person",
    },
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabBarBackground({ children }: { children: ReactNode }) {
  const { colors } = useTheme()
  const useGlass =
    Platform.OS === "ios" && isGlassEffectAPIAvailable();

  if (useGlass) {
    return (
      <GlassView
        className="flex align-items-center border border-surface-container p-2 overflow-hidden"
        glassEffectStyle="regular"
        colorScheme="dark"
        tintColor={colors.background}
        style={{ backgroundColor: colors.background }}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View
      style={{ backgroundColor: colors.background }}
      className="flex-row w-full rounded-lg border border-foreground/10 p-2 overflow-hidden"
    >
      {children}
    </View>
  );
}

function TabBarItem({
  label,
  icon,
  iconActive,
  isFocused,
  onPress,
  onLongPress,
  length,
}: {
  label: string;
  icon: TabIcon;
  iconActive: TabIcon;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  length: number;
}) {
  const scale = useSharedValue(1);
  const { colors } = useTheme()
  console.log({ width :Math.round(100 / length) });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
      style={[styles.tab,animatedStyle]}
    >
      {isFocused ? (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
        />
      ) : null}

      <SymbolView
        name={isFocused ? iconActive : icon}
        size={24}
        tintColor={isFocused ? colors.primary : colors.secondary}
        weight={isFocused ? "semibold" : "regular"}
      />

      <Text
        className={`font-semibold text-sm ${isFocused ? "text-primary" : "text-secondary"}`}
        numberOfLines={1}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

function MyTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        { paddingBottom: Math.max(insets.bottom, 12), backgroundColor: colors.background },
      ]}
      className="px-4 pt-2"
    >
      <TabBarBackground>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name] ?? {
            label: options.title ?? route.name,
            icon: TAB_CONFIG.index.icon,
            iconActive: TAB_CONFIG.index.iconActive,
          };

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TabBarItem
              key={route.key}
              label={config.label}
              icon={config.icon}
              iconActive={config.iconActive}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              length={state.routes.length}
            />
          );
        })}
      </TabBarBackground>
    </View>
  );
}

function TabLayout() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: "none",
          sceneStyle: { backgroundColor: colors.background },
          tabBarStyle: { backgroundColor: colors.background, borderTopWidth: 0 },
          sceneStyleInterpolator: () => ({
            sceneStyle: [{ backgroundColor: colors.background }],
          }),
        }}
      >
        <Tabs.Screen name="(drawer)" options={{ headerShown: false }} />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="order" options={{ title: "Order" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </View>
  );
}

export default TabLayout;
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,
    minHeight: 56,
  }
});
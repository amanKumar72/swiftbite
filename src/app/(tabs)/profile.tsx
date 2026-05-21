import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  const { user, setUser } = useUser();
  const { colors } = useTheme();
  const router = useRouter();
  console.log(user)

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [address, setAddress] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "",
    zipCode: user?.address?.zipCode || "",
  });

  const handleSaveAddress = () => {
    if (user) {
      setUser({
        ...user,
        address: address,
      });
    }
    setIsEditingAddress(false);
  };

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogout = () => {
    setUser(null);
    router.replace("/(auth)/sign-in");
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <SafeAreaView>
        <View className="min-h-screen px-4 py-6">
          {/* Profile Header */}
          <View className="flex flex-col items-center mb-8 z-10">
            <View className="relative mb-4">
              <View className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary-container shadow-2xl">
                <Image
                  source={{
                    uri: "https://www.masterji.co/images/home-page/ai-evaluator-mark.webp" ,
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <Pressable className="absolute bottom-1 right-1 bg-primary-container w-10 h-10 rounded-full items-center justify-center shadow-lg border-4 border-background">
                <FontAwesome
                  name="pencil"
                  size={16}
                  color={colors.onPrimaryContainer}
                />
              </Pressable>
            </View>
            <Text className="text-2xl font-bold text-on-surface mb-2">
              {user?.username || "User"}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="bg-primary-container/20 px-3 py-1 rounded-full flex-row items-center gap-1">
                <FontAwesome
                  name="check-circle"
                  size={14}
                  color={colors.primaryContainer}
                />
                <Text className="text-xs font-semibold text-primary-container">
                  {user?.isEmailVerified ? "Verified" : "Unverified"}
                </Text>
              </View>
            </View>
          </View>

          {/* Personal Information */}
          <View className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-4 mb-4 shadow-lg z-10">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <FontAwesome name="user" size={20} color={colors.primary} />
                <Text className="text-lg font-semibold text-on-surface">
                  Personal Information
                </Text>
              </View>
            </View>
            <View className="space-y-3">
              <View className="flex-row items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <FontAwesome
                    name="user"
                    size={18}
                    color={colors.primaryContainer}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-on-surface-variant">
                    Username
                  </Text>
                  <Text className="text-sm font-medium text-on-surface">
                    {user?.username || "N/A"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <FontAwesome
                    name="envelope"
                    size={18}
                    color={colors.primaryContainer}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-on-surface-variant">Email</Text>
                  <Text className="text-sm font-medium text-on-surface">
                    {user?.email || "N/A"}
                  </Text>
                </View>
                <View className="bg-primary-container/10 px-2 py-1 rounded">
                  <Text className="text-[10px] font-bold text-primary-container">
                    {user?.isEmailVerified ? "Verified" : "Unverified"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <FontAwesome
                    name="id-card"
                    size={18}
                    color={colors.primaryContainer}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-on-surface-variant">
                    Login Type
                  </Text>
                  <Text className="text-sm font-medium text-on-surface capitalize">
                    {user?.loginType || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Address Section */}
          <View className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-4 mb-4 shadow-lg z-10">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center gap-2">
                <FontAwesome
                  name="map-marker"
                  size={20}
                  color={colors.primary}
                />
                <Text className="text-lg font-semibold text-on-surface">
                  Saved Address
                </Text>
              </View>
              <Pressable onPress={() => setIsEditingAddress(!isEditingAddress)}>
                <Text className="text-sm font-semibold text-primary">
                  {isEditingAddress ? "Cancel" : "Edit"}
                </Text>
              </Pressable>
            </View>

            {isEditingAddress ? (
              <View className="space-y-3">
                <View>
                  <Text className="text-xs text-on-surface-variant mb-1">
                    Street
                  </Text>
                  <TextInput
                    className="input"
                    placeholder="Enter street address"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={address.street}
                    onChangeText={(text) =>
                      setAddress({ ...address, street: text })
                    }
                  />
                </View>
                <View>
                  <Text className="text-xs text-on-surface-variant mb-1">
                    City
                  </Text>
                  <TextInput
                    className="input"
                    placeholder="Enter city"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={address.city}
                    onChangeText={(text) =>
                      setAddress({ ...address, city: text })
                    }
                  />
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Text className="text-xs text-on-surface-variant mb-1">
                      State
                    </Text>
                    <TextInput
                      className="input"
                      placeholder="State"
                      placeholderTextColor={colors.onSurfaceVariant}
                      value={address.state}
                      onChangeText={(text) =>
                        setAddress({ ...address, state: text })
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-on-surface-variant mb-1">
                      ZIP Code
                    </Text>
                    <TextInput
                      className="button"
                      placeholder="ZIP"
                      placeholderTextColor={colors.onSurfaceVariant}
                      value={address.zipCode}
                      onChangeText={(text) =>
                        setAddress({ ...address, zipCode: text })
                      }
                    />
                  </View>
                </View>
                <View>
                  <Text className="text-xs text-on-surface-variant mb-1">
                    Country
                  </Text>
                  <TextInput
                    className="input"
                    placeholder="Enter country"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={address.country}
                    onChangeText={(text) =>
                      setAddress({ ...address, country: text })
                    }
                  />
                </View>
                <Pressable
                  onPress={handleSaveAddress}
                  className="button-primary"
                >
                  <Text className="text-white font-semibold">Save Address</Text>
                </Pressable>
              </View>
            ) : (
              <View className="p-3 bg-surface-container-low rounded-lg">
                {user?.address ? (
                  <View>
                    <Text className="text-sm text-on-surface">
                      {user.address.street}
                    </Text>
                    <Text className="text-sm text-on-surface">
                      {user.address.city}, {user.address.state}{" "}
                      {user.address.zipCode}
                    </Text>
                    <Text className="text-sm text-on-surface">
                      {user.address.country}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-sm text-on-surface-variant">
                    No address saved
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Account Info */}
          <View className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-4 mb-4 shadow-lg z-10">
            <View className="flex-row items-center gap-2 mb-4">
              <FontAwesome
                name="info-circle"
                size={20}
                color={colors.primary}
              />
              <Text className="text-lg font-semibold text-on-surface">
                Account Info
              </Text>
            </View>
            <View className="space-y-3">
              <View className="flex-row items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <FontAwesome
                    name="calendar"
                    size={18}
                    color={colors.primaryContainer}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-on-surface-variant">
                    Member Since
                  </Text>
                  <Text className="text-sm font-medium text-on-surface">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <FontAwesome
                    name="shield"
                    size={18}
                    color={colors.primaryContainer}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-on-surface-variant">Role</Text>
                  <Text className="text-sm font-medium text-on-surface capitalize">
                    {user?.role || "User"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={openLogoutModal}
            className="w-full h-14 border border-error/30 text-error rounded-xl flex-row items-center justify-center gap-2 mb-6 z-10"
          >
            <FontAwesome name="sign-out" size={20} color={colors.error} />
            <Text className="text-error font-semibold">Sign Out</Text>
          </Pressable>
        </View>

        {/* Logout Modal */}
      </SafeAreaView>
      {logoutModalVisible && (
        <View className="z-100 absolute inset-0 bg-background/50 flex items-center justify-center">
          <View className="bg-surface-container rounded-xl p-6">
            <Text className="text-xl font-semibold text-on-surface mb-4">
              Are you sure you want to log out?
            </Text>
            <View className="flex-row gap-4">
                <Pressable
                  onPress={closeLogoutModal}
                  className="flex-1 bg-surface-container-highest py-3 rounded-lg active:bg-surface-variant/30"
                >
                  <Text className="text-center text-on-surface font-semibold">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleLogout}
                  className="flex-1 bg-primary py-3 rounded-lg active:bg-primary/80"
                >
                  <Text className="text-center text-on-primary font-semibold">
                    Log Out
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
    </ScrollView>
  );
}

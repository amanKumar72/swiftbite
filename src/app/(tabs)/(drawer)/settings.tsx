import ThemeToggle from "@/components/toggle";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";

export default function SettingsTab() {
  const { colors } = useTheme();
  const router = useRouter();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const {removeUser} = useUser()
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
  };
  const handleLogout = () => {
    removeUser();
    router.replace("/(auth)/sign-in");
  };
  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-on-surface mb-1">
            Settings
          </Text>
          <Text className="text-base text-on-surface-variant">
            Manage your account preferences and app experience.
          </Text>
        </View>

        {/* Notifications Section */}
        <View className="bg-surface-container rounded-xl p-4 mb-4 border border-white/5">
          <View className="flex-row items-center gap-2 mb-4">
            <FontAwesome name="bell" size={22} color={colors.primary} />
            <Text className="text-lg font-semibold text-on-surface">
              Notifications
            </Text>
          </View>
          <View className="space-y-2">
            <View className="flex-row items-center justify-between p-3 rounded-lg">
              <View>
                <Text className="text-sm font-semibold text-on-surface">
                  Push Notifications
                </Text>
                <Text className="text-xs text-on-surface-variant">
                  Real-time order updates
                </Text>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{
                  false: colors.onSurfaceVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={
                  pushNotifications
                    ? colors.onPrimaryContainer
                    : colors.onSurface
                }
              />
            </View>
            <View className="flex-row items-center justify-between p-3 rounded-lg">
              <Text className="text-sm font-semibold text-on-surface">
                Email Notifications
              </Text>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{
                  false: colors.onSurfaceVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={
                  emailNotifications
                    ? colors.onPrimaryContainer
                    : colors.onSurface
                }
              />
            </View>
            <View className="flex-row items-center justify-between p-3 rounded-lg">
              <Text className="text-sm font-semibold text-on-surface">
                SMS Updates
              </Text>
              <Switch
                value={smsUpdates}
                onValueChange={setSmsUpdates}
                trackColor={{
                  false: colors.onSurfaceVariant,
                  true: colors.primaryContainer,
                }}
                thumbColor={
                  smsUpdates ? colors.onPrimaryContainer : colors.onSurface
                }
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View className="bg-surface-container rounded-xl p-4 mb-4 border border-white/5">
          <View className="flex-row items-center gap-2 mb-4">
            <FontAwesome name="user-circle" size={22} color={colors.primary} />
            <Text className="text-lg font-semibold text-on-surface">
              Account
            </Text>
          </View>
          <View className="space-y-1">
            <Pressable className="flex-row items-center justify-between p-3 rounded-lg active:bg-surface-variant/30">
              <Text className="text-sm font-semibold text-on-surface">
                Change Password
              </Text>
              <FontAwesome
                name="chevron-right"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-3 rounded-lg active:bg-surface-variant/30">
              <Text className="text-sm font-semibold text-on-surface">
                Privacy Settings
              </Text>
              <FontAwesome
                name="chevron-right"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          </View>
        </View>

        {/* App Preferences */}
          <View className="flex-1 flex-row items-center justify-between bg-surface-container rounded-xl p-4 mb-4 border border-white/5">
            <View className="flex-row items-center gap-2">
              <FontAwesome name="language" size={22} color={colors.primary} />
              <Text className="text-lg font-semibold text-on-surface">
                Language
              </Text>
            </View>
            <View className="flex-row items-center justify-between p-3 bg-surface-variant/20 rounded-lg">
              <Text className="text-sm text-on-surface">English (US)</Text>
              <FontAwesome
                name="chevron-down"
                size={20}
                color={colors.primary}
              />
            </View>
          </View>
          <View className="flex-1 flex-row items-center justify-between bg-surface-container rounded-xl p-4 mb-4 border border-white/5">
            <View className="flex-row items-center gap-2">
              <FontAwesome name="moon-o" size={22} color={colors.primary} />
              <Text className="text-lg font-semibold text-on-surface">
                Theme
              </Text>
            </View>
            <ThemeToggle/>
          </View>

        {/* About Section */}
        <View className="bg-surface-container rounded-xl p-4 mb-4 border border-white/5">
          <View className="flex-row items-center gap-2 mb-4">
            <FontAwesome name="info-circle" size={22} color={colors.primary} />
            <Text className="text-lg font-semibold text-on-surface">About</Text>
          </View>
          <View className="space-y-1">
            <Pressable className="flex-row items-center justify-between p-3 rounded-lg active:bg-surface-variant/30">
              <Text className="text-sm font-semibold text-on-surface">
                Terms of Service
              </Text>
              <FontAwesome
                name="chevron-right"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
            <Pressable className="flex-row items-center justify-between p-3 rounded-lg active:bg-surface-variant/30">
              <Text className="text-sm font-semibold text-on-surface">
                Privacy Policy
              </Text>
              <FontAwesome
                name="chevron-right"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
            <View className="p-3 pt-4 border-t border-white/5 mt-3 flex-row justify-between items-center">
              <Text className="text-xs text-on-surface-variant">
                Version 4.2.0
              </Text>
              <Text className="text-xs text-on-surface-variant">
                © 2024 Savor App Inc.
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable onPress={openLogoutModal}  className="w-full bg-primary border border-error/20 py-4 rounded-xl active:bg-error/10">
          <Text className="text-center text-on-primary font-semibold text-base">
            Log Out
          </Text>
        </Pressable>
      </ScrollView>
      {logoutModalVisible && (
        <View style={{ elevation: 10 }} className="absolute inset-0 bg-black/50 flex items-center justify-center">
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
    </View>
  );
}

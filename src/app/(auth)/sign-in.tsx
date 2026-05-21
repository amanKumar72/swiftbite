import { useRouter } from "expo-router";
import { use, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { Button } from "@react-navigation/elements";

const SignIn = () => {
  const { width } = useWindowDimensions();
  const {setUser} = useUser()
  const isDesktop = width >= 768;
  const { colors } = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setIsLoading(true);
    setError("");
    if (!userName || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }
    if (password.length > 20) {
      setError("Password must be less than 20 characters");
      setIsLoading(false);
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
      setIsLoading(false);
      return;
    }
    const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "An error occurred while creating your account");
      setIsLoading(false);
      return;
    }
    const userData = data.data.user
    await setUser({
      _id: userData._id as string,
      avatar: {
        _id: userData.avatar._id as string,
        localPath: userData.avatar.localPath as string,
        url: userData.avatar.url as string,
      },
      createdAt: userData.createdAt as string,
      email: userData.email as string,
      isEmailVerified: userData.isEmailVerified as boolean,
      loginType: userData.loginType as string,
      role: userData.role as string,
      updatedAt: userData.updatedAt as string,
      username: userData.username as string
    });
    setIsLoading(false);
    setUserName("");
    setPassword("");
    router.push("/");
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="grow flex-col items-center justify-center px-5 py-16 min-h-screen">
        {/* Hero Decorative Background */}
        <View className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
          <View className="absolute top-[-10%] right-[-10%] w-150 h-150 rounded-full bg-primary/20 blur-[120px]" />
          <View className="absolute bottom-[-10%] left-[-10%] w-125 h-125 rounded-full bg-tertiary/10 blur-[100px]" />
        </View>

        {/* Auth Container */}
        <View className="w-full max-w-md z-10">
          {/* Brand Anchor */}
          <View className="flex flex-col items-center text-center mb-16">
            <Text className="text-primary text-5xl font-extrabold tracking-tighter mb-2">
              SwiftBite
            </Text>
            <Text className="text-base text-on-surface-variant/70">
              Experience culinary excellence delivered.
            </Text>
          </View>

          {/* Sign In Card */}
          <View className="bg-white/5 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-2xl">
            <Text className="text-2xl text-center font-semibold mb-6 text-on-surface">
              Sign In
            </Text>

            <View className="space-y-4">
              {/* Email Field */}
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-on-surface-variant ml-1 my-2">
                  User Name
                </Text>
                <View className="relative">
                  <TextInput
                    className="input-icon"
                    placeholder="name@example.com"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={userName}
                    onChangeText={setUserName}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground text-2xl">
                    ✉
                  </Text>
                </View>
              </View>

              {/* Password Field */}
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-on-surface-variant ml-1 my-2">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    className="input-icon"
                    placeholder="••••••••"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground text-2xl">
                    🔒
                  </Text>
                  <FontAwesome
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    name={showPassword ? "eye-slash" : "eye"}
                    size={20}
                    color={colors.foreground}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>
              <Text className="text-sm text-on-surface-variant ml-1 my-2 italic">
                Note: User Name must be lowercase. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character
              </Text>
              {error ? <Text className="text-red-500 text-sm">{error}</Text> : null}
              {/* Sign In Button */}
              <Pressable
                onPress={handleSignIn}
                className="w-fit h-14 flex items-center justify-center bg-primary-container rounded-xl mt-4 active:scale-[0.98]"
              >
                <Text className="text-white text-lg font-semibold text-center leading-[56px]">
                  Sign In
                </Text>
              </Pressable>
            </View>

            {/* Social Authentication */}
            {/* <View className="mt-6">
              <View className="relative flex items-center mb-6">
                <View className="grow border-t border-white/5" />
                <Text className="shrink mx-4 text-xs text-on-surface-variant/40 uppercase tracking-widest">
                  Or continue with
                </Text>
                <View className="grow border-t border-white/5" />
              </View>

              <View className="flex flex-row gap-4">
                <Pressable className="flex-1 flex-row items-center justify-center h-14 bg-surface-container-high border border-white/5 rounded-lg">
                  <Image
                    source={{
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCniA66BG4hWDSaXXm-K8fUdcRTfT7h70hA7cM8dwrFfUpPLlhDahwHcWECoXGFU9Gjp_aYsqBV0JnwsNQ1L_EVMY9hNN18dAxa38Z83jDaEjuBTS7C_TKG6J94v1MbMPo0IXN5LzoRNCVBu2g94nhEXxTzMp7coNrSk6irJ6kyAdcLecP8OVcmFjFkUwxHl7f-ksH7BPWDRntT9bApvrIxB1jAWs3KThzjAzIz8zWx0npBnH8FhpWXnSPYa9oun6Kf3wJx3MDjDhAG",
                    }}
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-sm font-semibold text-on-surface">
                    Google
                  </Text>
                </Pressable>
                <Pressable className="flex-1 flex-row items-center justify-center h-14 bg-surface-container-high border border-white/5 rounded-lg">
                  <FontAwesome name="apple" size={20} color="#666" className="mr-3" />
                  <Text className="text-sm font-semibold text-on-surface">
                    Apple
                  </Text>
                </Pressable>
              </View>
            </View> */}

            {/* Sign Up Redirection */}
            <View className="mt-6">
              <Text className="text-center text-base text-on-surface-variant">
                Don't have an account?{" "}
                <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
                  <Text className="text-primary font-bold">Sign Up</Text>
                </Pressable>
              </Text>
            </View>
          </View>
        </View>

        {/* Featured Visual (Desktop Only) */}
        {isDesktop && (
          <View className="fixed bottom-0 right-0 p-16 max-w-md">
            <View className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/5 p-2 rotate-3 shadow-2xl">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoRInxb1gwe6iBS1tMwSDWjDYKAH0YXZTpRBawCg5JuVt7zZnLXJnNmdx98nv2pa92cYttnrAYVQyCRznr8MvqFjluaiHTnAk-E4WpFV51Zjio2PMn6Lb1UGVUQY-8lcIEDM5xAEIYhc6PoGFUisRs7jWEgUYdX47jwby2zM8qGflGKLcLSzNHEsgLF8BO5awMsgA2wnda7Gp7VwXXaAxu1X01RONrU57dOX2SPaSs8UqNZouNsayvFsouZWuXo8w3fYiN4RE591R5",
                }}
                className="rounded-lg w-64 h-80"
                resizeMode="cover"
              />
              <View className="mt-4 px-2 pb-2">
                <Text className="text-lg font-semibold text-on-surface">
                  Artisan Selection
                </Text>
                <Text className="text-xs text-primary">
                  Discover the finest urban flavors.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View className="py-4 text-center opacity-40">
        <Text className="text-xs text-on-surface-variant">
          © 2026 SwiftBite Food Delivery. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;

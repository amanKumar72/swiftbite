import { useTheme } from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

const SignUp = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const { colors } = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");
    if (!userName || !email || !phone || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!/^\+?[\d\s\-\(\)]+$/.test(phone)) {
      setError("Please enter a valid phone number");
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
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/.test(
        password,
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      );
      setIsLoading(false);
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }
    const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        email,
        phone,
        role: "USER",
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "An error occurred while creating your account");
      setIsLoading(false);
      return;
    }
    router.replace("/(auth)/sign-in");
    setIsLoading(false);
    setUserName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAgreeTerms(false);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="grow flex-col items-center justify-center px-5 py-16 min-h-screen">
        {/* Hero Decorative Background */}
        <View className="fixed inset-0 overflow-hidden opacity-20 pointer-events-none">
          <View className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
          <View className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-tertiary/10 blur-[100px]" />
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

          {/* Sign Up Card */}
          <View className="bg-white/5 backdrop-blur-xl border border-white/5 p-5 rounded-xl shadow-2xl">
            <Text className="text-2xl text-center font-semibold mb-6 text-on-surface">
              Sign Up
            </Text>

            <View className="space-y-4">
              {/* Full Name Field */}
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-on-surface-variant ml-1 my-2">
                  User Name
                </Text>
                <View className="relative">
                  <TextInput
                    className="input-icon"
                    placeholder="amankumar"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={userName}
                    onChangeText={setUserName}
                  />
                  <FontAwesome
                    name="user"
                    size={20}
                    color={colors.foreground}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                </View>
              </View>

              {/* Email Field */}
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-on-surface-variant ml-1 my-2">
                  Email Address
                </Text>
                <View className="relative">
                  <TextInput
                    className="input-icon"
                    placeholder="name@example.com"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color={colors.foreground}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                </View>
              </View>

              {/* Phone Field */}
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-on-surface-variant ml-1 my-2">
                  Phone Number
                </Text>
                <View className="relative">
                  <TextInput
                    className="input-icon"
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                  <FontAwesome
                    name="phone"
                    size={20}
                    color={colors.foreground}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
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
                  <FontAwesome
                    name="lock"
                    size={20}
                    color={colors.foreground}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={20}
                    color={colors.foreground}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </View>
              </View>

              {/* Terms Checkbox */}
              <View className="flex-row items-start gap-2 py-2">
                <Pressable
                  className="w-5 h-5 rounded border border-foreground/20 bg-surface-container flex items-center justify-center"
                  onPress={() => setAgreeTerms(!agreeTerms)}
                >
                  {agreeTerms && (
                    <FontAwesome
                      name="check"
                      size={14}
                      color={colors.primary}
                    />
                  )}
                </Pressable>
                <Text className="text-sm text-on-surface-variant leading-tight flex-1">
                  I agree to the{" "}
                  <Text className="text-primary font-semibold">
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text className="text-primary font-semibold">
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </View>

              <Text className="text-sm text-on-surface-variant ml-1 my-2 italic">
                Note: User Name must be lowercase. 
                Password must be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one number and
                one special character
              </Text>
              {error ? (
                <Text className="text-red-500 text-sm">{error}</Text>
              ) : null}

              {/* Sign Up Button */}
              <Pressable
                onPress={handleSignUp}
                className="button-primary"
              >
                <Text className="text-white text-lg font-semibold text-center leading-[56px]">
                  Create Account
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
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TSOdXDTbS4Eq836Y0pCDJw39_puXgwuUX3alWvJYbPfgL7oUiYTeO8OppVdgz4cZiNAYOHSCywJq1TPJ8TruPr02wkEEufMt3VFXLYbRZ9BPYg47uNeSVQExzAXm6PFjA7XkxIsnlIQqAwPKn-h3w8QHvi51KBH8gEOLZ6g-I3w0heFHOUPJRmVzaKZIXfXVX5K0Zd8MCWeOMK28EVBLcvOdoiUNsnQ5Va7P-U2w5yNJZUq2Z6D4HOHL2nispbvuPg1gerS_xinZ",
                    }}
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-sm font-semibold text-on-surface">Google</Text>
                </Pressable>
                <Pressable className="flex-1 flex-row items-center justify-center h-14 bg-surface-container-high border border-white/5 rounded-lg">
                  <FontAwesome name="apple" size={20} color="#666" className="mr-3" />
                  <Text className="text-sm font-semibold text-on-surface">Apple</Text>
                </Pressable>
              </View>
            </View> */}

            {/* Sign In Redirection */}
            <View className="mt-6">
              <Text className="text-center text-base text-on-surface-variant">
                Already a member?{" "}
                <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
                  <Text className="text-primary font-bold">Sign In</Text>
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
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK7EtlyzEiSLxYJwi5FcyN51UWNvzUO2VCH9epKOzAwv7Ctuh9eyd8oNarrNOM-xvoG1yFqz6f5rn47AIWZg7GrWhYkZlkhiisOsJ1F9OMNUzhXlpZ2TpdoQu7fkmIV5wUX94YtGKlc3Goar2YNsYz35xzm3BaYxxYd0q--GQWDklfSk4Mo5hIX2ReGJiF53N1cxnoGQg_5fkZMl8pt_MRIEDlvGfze3NzWswxpjVh0WGxmk4S-M2mIThmX0JzMmjg_wM4IfcDAMir",
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

export default SignUp;

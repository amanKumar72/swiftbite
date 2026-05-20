import Navbar from "@/components/navbar";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View
} from "react-native";

const Home = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <Navbar />
      {!isDesktop ? (
        <View className="flex-1 h-full items-center justify-end mb-20">
          {/* Background Image */}
          <View className="absolute inset-0 z-0">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmhIorqMYsRza0fkOsmOeYL2Pb1Egk1oRIfNaP46dBLwvdLkzyj4M-rXMqYg0O8HaOjt1EqTNvUWOl9JRCAGKoH-fCmv5WROgkNRdvNjH3OyWNBiAa10ThHyN172ETSEcrrmkCvwe56Rr6VvN-Oenjluil2fVuyHinlgTj1Lyngwfx3TxpSly7jWAwiuour69K2MR7wQ3yuTZKbb5xuAnCv7xl923IoGUfWlbd4AoX29EsguSiNRNtNr0YOHqet_DNefh-Tv1zACzK",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 " />
          </View>

          {/* Header*/}
          <View className="relative z-10 w-full px-5 h-16 flex justify-center items-center">
            <Text className="text-white text-2xl font-bold tracking-tighter">
              SWIFTBYTE
            </Text>
          </View>

          {/* Content Area */}
          <View className="relative bottom-0 z-10 w-full px-5 flex flex-col items-center text-center mb-16">
            <Text className="text-white text-2xl font-bold mb-3">
              Enjoy Every Bite
            </Text>
            <Text className="text-gray-100 text-base max-w-[280px] mb-6">
              Discover the best local flavors delivered to your door.
            </Text>

            {/* Primary CTA */}
            <Pressable
              onPress={() => {
                router.replace("/sign-in");
              }}
              className="w-full h-[56px] bg-primary rounded-xl items-center justify-center shadow-lg"
            >
              <Text className="text-white text-lg font-semibold">
                Get Started
              </Text>
            </Pressable>

            {/* Social Proof */}
            <View className="mt-4 flex-row items-center gap-1">
              <View className="flex-row -space-x-2">
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6N-e9jiVqrfpybUi0zeok1tqSChEDNtsLqNh21tyoZf_h_UMgEZ28xSL08Q2IVDs1As6TnYaKHW7Rf4I9xB36rpTVz-lRLqBCFvyE5kkOXIlUrpb2LEv5l8Aiv-Gx9q6wvSmGohdalV5uo_BIEwq1T3j8Jvn2UtVDqcfBeFdpG857wGM5ZwcAS9NQFE0ggXvYn2wTqxgwdvbu0ItJRU4l6vxsmFpUaUGSHzvl_OXq02t3uIjPEr1rH8sbgdoTNf0Dhq_dRytLLJ-",
                  }}
                  className="w-6 h-6 rounded-full border-2 border-primary"
                />
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe83MT935nbhxC9EPpk1r21L6tVp-dy7m4X8lpCD0od9au9JfM7Akheildf6KPCP6UELLSipdMi0SZK9Fc5TsWt33jgpJh5wHQ27w3_X9tuP0ECrMqSJZzD5GkdL3_NBBQEg_L5_Xi0NsFMDUTy6P0AqoNs8WG_34knsLvb189oo4nBW8-M_0w5H-c_L4vFrSqklegW7_8bgXQF-ryTx-3hCnBQAMlva0xdxSsb730-FuR16lpMw0Z80xc_1TXdnU5QcDIMMZOB2O8",
                  }}
                  className="w-6 h-6 rounded-full border-2 border-primary"
                />
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd4qUY6mG9-uOzo4x5wX--eHRQhqMzy_HLe_RW5xW_sOIopVXcLfPJjUjifhNcmj5YMtWlSlPm1BtwwxG2xmCxlDjy-JcQ1gVbY8uOjZ6-MhOY_WHuMvWrpbQ89zOp4BKlNUSNHscR2umIPJYHgigl6Xp104-VAxHuGXYhUX75nd0EwHVodqi2kC7q0SV0e3vh4ZB0A8PV5pb3oQ4VoOKpMfvvuMPxMNbhmvnBcv6DcuPhJFGHqArvqQ81OMefSQyZfYvh1PoUgcE1",
                  }}
                  className="w-6 h-6 rounded-full border-2 border-primary"
                />
              </View>
              <Text className="text-[#c8c6c5]/60 text-xs ml-2">
                Joined by 10k+ food lovers
              </Text>
            </View>
          </View>

          {/* Decorative Bottom Detail */}
          <View className="absolute bottom-0 w-full h-1" />
        </View>
      ) : (
        /* Desktop Version */
        <View className="flex-1 bg-background/95 items-center justify-center p-16">
          <View className="max-w-4xl flex-row gap-16 items-center">
            <View className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl border border-white/10">
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4qQt0rEED2bMtI7cRp-CXKgP2H6kIJcl3zGK8ng5hMRJ92_rLOIFoEkzzEmLwX2V1LmSsJUmazb2DEOXgC6MqHpuBSzEouoBVAuyzCbiucO7_9EcRxEbJjSC0wFdClm-oQqsh6cyrNkRRTfHPlONqiWZmd3OHdWg1rKakhBpIWjf2O0LJ1jd1aAxTaKolQvsvDE_XYr9jP6k-tgyCxoJQcpVMS2b9rdKZxQb31x6YXPzIzC0Cs--ssi-ujdeJSI5s5abkBPmh-7dy",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex flex-col gap-4">
              <Text className="text-[#ffb693] text-sm font-semibold uppercase tracking-widest">
                Premium Delivery
              </Text>
              <Text className="text-[#e5e2e1] text-5xl font-extrabold leading-tight">
                Experience Culinary Artistry at Home.
              </Text>
              <Text className="text-[#e2bfb0] text-lg">
                Savor brings the city's most exclusive kitchens directly to your
                table with unparalleled service and speed.
              </Text>
              <Pressable className="bg-[#ff6b00] h-14 px-6 rounded-xl self-start">
                <Text className="text-white text-base font-semibold">
                  Launch App
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

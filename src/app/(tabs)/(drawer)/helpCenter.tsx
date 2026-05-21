import { useTheme } from "@/hooks/useTheme";
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

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { colors } = useTheme();
  return (
    <View className="rounded-2xl bg-surface-container-low border border-white/5 overflow-hidden mb-4">
      <Pressable
        onPress={onToggle}
        className={`w-full p-5 flex-row items-center justify-between ${
          isOpen ? "bg-surface-variant" : ""
        }`}
      >
        <Text className="flex-1 font-semibold text-on-surface pr-4">
          {question}
        </Text>
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.secondary}
        />
      </Pressable>
      {isOpen && (
        <View className="px-5 pb-5 border-t border-white/5 pt-4">
          <Text className="text-secondary/70 leading-6">{answer}</Text>
        </View>
      )}
    </View>
  );
};

const HelpCenter = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where is my order right now?",
      answer:
        "You can track your order in real-time through the 'My Orders' section in your profile. You'll see the driver's current location on a map once the food has been picked up from the restaurant.",
    },
    {
      question: "How do I request a refund for a missing item?",
      answer:
        "To request a refund, go to your order history, select the order with the missing item, and tap on 'Report an Issue'. Our support team will review your request within 24 hours.",
    },
    {
      question: "Can I change my delivery address after ordering?",
      answer:
        "Address changes are only possible if the restaurant hasn't started preparing your order. Please contact our support team immediately through the chat option.",
    },
    {
      question: "What happens if my driver is late?",
      answer:
        "If your delivery is significantly delayed, you may be eligible for a credit. Please check the 'Help' section of your active order for real-time updates and compensation options.",
    },
  ];

  return (
    <View className="flex-1 bg-background">
      {/* <SafeAreaView className="bg-surface-container/50 border-b border-white/5">
        <View className="h-16 flex-row items-center px-5 justify-between">
          <View className="flex-row items-center gap-4">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant"
            >
              <FontAwesome name="arrow-left" size={20} color={colors.primary} />
            </Pressable>
            <Text className="text-2xl font-bold text-primary tracking-tighter">
              Savor
            </Text>
          </View>
          <View className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwzxFu09YSJOso28fZBXtgJv36hHSEiT3STODJbP1sukQGocQcTVbm6T7bqlOwKN277WIzgbT0Vx2gRO8fZyIGeWE4r5NsmIHZQN6Qah_fs5nau51WasZSlboVYWfsdhR-hpQXFgz9_KpsUVZs0xi1CYh39hpAP_6CrhtKZx8fk21f1pWs7fRxoE-hKn39l-Ne5qaw-g3-PMQkE91aK_L3--b4Xb_m1X0xsgL2pZ7zDjZojlMGczcepPUbmYr9NTDUisoH3dxn1rPz",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </SafeAreaView> */}

      <ScrollView className="flex-1 px-5 pb-10" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-on-surface mb-2">
            How can we help you?
          </Text>
          <Text className="text-base text-secondary/70">
            Find answers to your questions or get in touch with our team.
          </Text>
        </View>

        {/* Search Bar */}
        <View className="relative mb-10">
          <FontAwesome
            name="search"
            size={18}
            color={colors.secondary + "80"}
            style={{ position: "absolute", left: 20, top: 18, zIndex: 10 }}
          />
          <TextInput
            className="w-full h-14 bg-surface-container-high rounded-full pl-14 pr-6 text-on-surface"
            placeholder="Search for FAQs, topics..."
            placeholderTextColor={colors.secondary + "80"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Grid */}
        <View className="flex-row flex-wrap gap-4 mb-12">
          {[
            { icon: "shopping-cart", title: "Order Issues", sub: "Status, tracking" },
            { icon: "credit-card", title: "Payment", sub: "Refunds, billing" },
            { icon: "user", title: "Account", sub: "Settings, security" },
            { icon: "shield", title: "Safety", sub: "Health protocols" },
          ].map((cat, i) => (
            <Pressable
              key={i}
              className="w-[47%] p-5 rounded-3xl bg-surface-container-high border border-white/5"
            >
              <View className="w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-4">
                <FontAwesome name={cat.icon as any} size={20} color={colors.primary} />
              </View>
              <Text className="font-bold text-on-surface">{cat.title}</Text>
              <Text className="text-[10px] text-secondary/50 mt-1">{cat.sub}</Text>
            </Pressable>
          ))}
        </View>

        {/* FAQ Section */}
        <View className="mb-12">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-on-surface">
              Popular Questions
            </Text>
            <Pressable>
              <Text className="text-primary font-semibold">View all</Text>
            </Pressable>
          </View>
          <View>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onToggle={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
              />
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View className="p-8 rounded-4xl bg-surface-container-high border border-white/5 mb-10 overflow-hidden">
          <View className="relative z-10">
            <Text className="text-xl font-bold text-on-surface mb-2">
              Still need help?
            </Text>
            <Text className="text-sm text-secondary/70 mb-8">
              Our support team is available 24/7 to assist you with any inquiries.
            </Text>
            <View className="gap-3">
              <Pressable className="w-full h-14 bg-primary-container rounded-2xl flex-row items-center justify-center gap-3 ">
                <FontAwesome name="comment" size={18} color="white" />
                <Text className="font-bold text-white">Chat with us</Text>
              </Pressable>
              <Pressable className="w-full h-14 bg-surface-variant rounded-2xl flex-row items-center justify-center gap-3 ">
                <FontAwesome name="phone" size={18} color={colors.onSurface} />
                <Text className="font-bold text-on-surface">Call Support</Text>
              </Pressable>
            </View>
          </View>
          <View className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full" />
        </View>

        {/* Additional Channels */}
        <View className="flex-row gap-4 mb-12">
          <View className="flex-1 p-4 rounded-2xl bg-surface-container-low border border-white/5 items-center">
            <FontAwesome name="envelope" size={18} color={colors.primary} className="mb-2" />
            <Text className="text-[10px] text-secondary/70">Email Support</Text>
          </View>
          <View className="flex-1 p-4 rounded-2xl bg-surface-container-low border border-white/5 items-center">
            <FontAwesome name="twitter" size={18} color={colors.primary} className="mb-2" />
            <Text className="text-[10px] text-secondary/70">Twitter Help</Text>
          </View>
        </View>

        {/* Visual Grids */}
        <View className="gap-6 mb-20">
          <View className="relative h-48 rounded-4xl overflow-hidden">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtWLtVTuFoSHgUG_APqhPvw-pKmgJAbBFbJ7Wh2AgKzLJ2pNp4fsuIRlNwf-YLTWZyeBMeVlrEmh5y_zkiBA51oxsZFZCLqb_sju5EYZ7LbFrcZMOgWyIhPOlYPQRiSL-wtP4VYeaTethCR7lp_3cgw1F0JaogK79CF8UyFF2lFpPKNnb2EYmjLfNpXgiihVHoULT2MtjZHgd1-wTmUfiAA8Urfu6ah-wyuXLphkOxYTP8jrv0ZWf3lRkDpH93QOim7PYutcHa1biU",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/40 p-6 justify-end">
              <Text className="text-xl font-bold text-white">Community Forums</Text>
              <Text className="text-xs text-white/70">Join discussions with other foodies.</Text>
            </View>
          </View>
          <View className="relative h-48 rounded-4xl overflow-hidden">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGKQJrmcgHVehnAs7sZWvKOXFeoGJnGHCShKRVOnJ0q9ZZgfW3uPSD3bZyZpJhOLTwSnXx0Olx0mlrargudyuOktgDdZF3LqYCQTKgJ7GbWEbIxATsyx6FTV2zzXCNXXzyPz4S2wp2m8oPlvBt-Mo7KrVk9Q73iNeTyz3Yxzml8-To49u-uR5xpFmme2eh9icZLzULR_lGGyEvj5vE8gnrIupTdh9iC8LsGpQjKN4MVyMujMv_1oVyCsfn4LWqavzogkXpy8g5gWiX",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/40 p-6 justify-end">
              <Text className="text-xl font-bold text-white">Resource Center</Text>
              <Text className="text-xs text-white/70">Detailed guides and tutorials.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpCenter;

import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { dummy_chats } from "@/constants/dummy_data/chats"
import { InChatHeader } from "@/components/chats/InChatHeader"
import { Chat } from "@/@types/chat"
import { InChatScreen } from "@/components/chats/InChastScreen"
import { CourierScreenHeader } from "@/components/courier/CourierScreenHeader"
import { AboutCourier } from "@/components/courier/AboutCourier"

export default function index() {
  const { courier_id } = useLocalSearchParams()
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <View
          style={{
            paddingInline: 16,
            paddingBottom: 50,
            padding: 0,
            gap: 15,
            backgroundColor: "white",
            minHeight: 500,
          }}
        >
          <CourierScreenHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 110 }}
          >
            <AboutCourier />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

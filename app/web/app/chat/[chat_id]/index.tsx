import { View, Text } from "react-native"
import React from "react"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { dummy_chats } from "@/constants/dummy_data/chats"
import { InChatHeader } from "@/components/chats/InChatHeader"
import { Chat } from "@/@types/chat"
import { InChatScreen } from "@/components/chats/InChastScreen"

export default function index() {
  const { chat_id } = useLocalSearchParams()
  const chat = dummy_chats.find((chat) => chat.chat_id === chat_id)
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <View style={{ paddingInline: 16, paddingBottom: 50, gap: 15 }}>
          <InChatHeader chat={chat as Chat} />
          <InChatScreen chat_id={chat_id as string} />
        </View>
      </SafeAreaView>
    </>
  )
}

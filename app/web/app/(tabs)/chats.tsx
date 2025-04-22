import { View, Text, ScrollView } from "react-native"
import React from "react"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { ChatScreen } from "@/components/chats/ChatScreen"
import { SearchChats } from "@/components/chats/SearchChats"

export default function chats() {
  return (
    <View
      style={{
        padding: 16,
        paddingTop: 20,
        gap: 20,
        position: "relative",
        backgroundColor: "#fff",
        minHeight: "100%",
        paddingBottom: 50,
      }}
    >
      <ScreenHeader title="Chats" />
      <View>
        <SearchChats />
      </View>
      <ChatScreen />
    </View>
  )
}

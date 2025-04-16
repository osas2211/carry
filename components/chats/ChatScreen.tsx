import { View, Text, FlatList } from "react-native"
import React from "react"
import { SearchChats } from "./SearchChats"
import { dummy_chats } from "@/constants/dummy_data/chats"
import { ChatCard } from "./ChatCard"

export const ChatScreen = () => {
  return (
    <View style={{ gap: 15, paddingBottom: 0 }}>
      <FlatList
        style={{ marginBottom: 215 }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={dummy_chats}
        renderItem={({ item }) => {
          return <ChatCard key={item.chat_id} chat={item} />
        }}
      />
    </View>
  )
}

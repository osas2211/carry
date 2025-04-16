import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native"
import React from "react"
import { dummy_chats } from "@/constants/dummy_data/chats"
import { ChatCard } from "./ChatCard"
import { dummy_messages } from "@/constants/dummy_data/chat_messages"
import MessageCard from "./MessageCard"
import MessageGroup from "./MessageGroup"
import { groupMessagesByDate } from "@/utils/getMesssagesByDateGroup"
import { appColors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"
import { IconAvatar } from "../ui/Avatar"

export const InChatScreen = ({ chat_id }: { chat_id: string }) => {
  const messages = dummy_messages.filter((chat) => chat.chat_id === chat_id)
  const messagesGroup = groupMessagesByDate([...messages, ...messages])
  return (
    <View style={{ gap: 15, paddingBottom: 0 }}>
      {messagesGroup?.length === 0 ? (
        <View
          style={{
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            minHeight: "97%",
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              textAlign: "center",
              backgroundColor: appColors.grey,
              padding: 5,
              paddingInline: 10,
              borderRadius: 7,
            }}
          >
            Start a conversation now.
          </Text>
        </View>
      ) : (
        <MessageGroup grouped_message={messagesGroup.reverse()} />
      )}

      <View
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          width: "100%",
          // height: 130,
          backgroundColor: appColors.background,
        }}
      >
        <View style={{ position: "relative", elevation: 1 }}>
          <TextInput
            multiline
            style={{
              backgroundColor: appColors.grey,
              minHeight: 50,
              maxHeight: 90,
              borderRadius: 20,
              paddingLeft: 40,
              paddingRight: 55,
              zIndex: 0,
            }}
            placeholder="Type message"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 13,
              left: 10,
              zIndex: 200,
              // transform: "translateY(-35%)",
            }}
          >
            <Feather
              name="camera"
              size={24}
              // color="#A5A5A5"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 200,
            }}
          >
            <IconAvatar
              size={50}
              bgColor={appColors.primary}
              icon={
                <Feather
                  name="send"
                  size={24}
                  // color="#A5A5A5"
                />
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

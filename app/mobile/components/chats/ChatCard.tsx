import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import { Chat } from "@/@types/chat"
import { AvatarWithStatus } from "../ui/Avatar"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import Ionicons from "@expo/vector-icons/Ionicons"
import moment from "moment"
import { router } from "expo-router"

export const ChatCard = ({ chat }: { chat: Chat }) => {
  const status = !chat.user.online_status ? "offline" : "online"
  return (
    <TouchableOpacity
      onPress={() => router.push(`/chat/${chat?.chat_id}`)}
      style={{
        padding: 10,
        backgroundColor: appColors.grey,
        borderRadius: 15,
        marginBottom: 7,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AvatarWithStatus
          src={chat.user.profile_url}
          status={status}
          size={47}
        />
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 500 }}>{chat?.user?.name}</Text>
          {chat?.messageType === "text" ? (
            <Text style={{ fontWeight: 300, fontSize: 12 }}>
              {chat?.last_message}
            </Text>
          ) : (
            <View style={{ flexDirection: "row", gap: 2 }}>
              <EvilIcons name="image" size={20} color="#A5A5A5" />
              <Text style={{ fontWeight: 300, fontSize: 12, marginTop: 1.5 }}>
                Sent an image
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
        <Text style={{ fontWeight: 400, fontSize: 11, marginTop: 1.5 }}>
          {moment(chat.createdAt).format("LT")}
        </Text>
        {chat?.unread_message_count > 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 20,
              width: 20,
              backgroundColor: appColors.primary,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontWeight: 400,
                fontSize: 11,
                marginTop: 1.5,
              }}
            >
              {chat?.unread_message_count}
            </Text>
          </View>
        ) : (
          <>
            {chat?.from_me ? (
              <>
                {!chat?.delivered ? (
                  <Ionicons name="checkmark" size={20} color="black" />
                ) : (
                  <Ionicons
                    name="checkmark-done"
                    size={20}
                    color={chat?.is_read ? appColors.blue : "black"}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

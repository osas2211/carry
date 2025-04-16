import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import { AvatarWithStatus, IconAvatar } from "../ui/Avatar"
import Feather from "@expo/vector-icons/Feather"
import { appColors } from "@/constants/Colors"
import { router } from "expo-router"
import { Chat } from "@/@types/chat"
import AntDesign from "@expo/vector-icons/AntDesign"
// import { DrawerLayout } from "react-native-gesture-handler"

export const InChatHeader = ({ chat }: { chat: Chat }) => {
  const status = chat?.user?.online_status ? "online" : "offline"
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        // marginBottom: 20,
        // padding: 0,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",
          gap: 10,
          // marginBottom: 20,
          // padding: 0,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={router.back}>
          <IconAvatar
            icon={
              <Feather name="arrow-left" size={24} color={appColors.text} />
            }
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,

            backgroundColor: "white",
          }}
        >
          <AvatarWithStatus
            src={chat?.user?.profile_url}
            status={status}
            size={47}
          />
          <Text style={{ fontSize: 15, fontWeight: 500, color: "black" }}>
            {chat?.user?.name}
          </Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={1}>
        <IconAvatar
          size={50}
          icon={<AntDesign name="phone" size={24} color="black" />}
          bgColor={appColors.grey}
        />
      </TouchableOpacity>
    </View>
  )
}

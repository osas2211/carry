import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react"
import { router } from "expo-router"
import { AvatarWithStatus, IconAvatar } from "../ui/Avatar"
import { Feather } from "@expo/vector-icons"
import { appColors } from "@/constants/Colors"
import moment from "moment"

export const CourierScreenHeader = () => {
  return (
    <View>
      <TouchableOpacity onPress={router.back}>
        <IconAvatar
          icon={<Feather name="arrow-left" size={24} color={appColors.text} />}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <AvatarWithStatus
          src={"https://randomuser.me/api/portraits/men/10.jpg"}
          status="online"
          size={90}
        />
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 22, fontWeight: 500 }}>
            Johnson Alexandre
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 300 }}>
            Joined since {moment().format("LL")}
          </Text>
          {/* <Text style={{ fontSize: 12, fontWeight: 300 }}>9tsx...fbds</Text> */}
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Feather name="star" size={20} color={appColors.pending} />
            <Text style={{ fontSize: 12, fontWeight: 300 }}>4.5</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

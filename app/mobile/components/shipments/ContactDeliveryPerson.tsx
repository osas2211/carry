import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import { Avatar, IconAvatar } from "../ui/Avatar"
import AntDesign from "@expo/vector-icons/AntDesign"
import { router } from "expo-router"

export const ContactDeliveryPerson = () => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: appColors.primary,
        borderRadius: 50,
        padding: 5,
        marginBottom: 50,
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 1,
        flexDirection: "row",
        marginTop: 5,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Avatar
          size={50}
          src="https://img.freepik.com/free-photo/medium-shot-woman-relaxing-home_23-2150307065.jpg?uid=R186311965&ga=GA1.1.130725952.1732971873&semt=ais_hybrid&w=740"
        />
        <View>
          <Text style={{ fontWeight: 500, fontSize: 13 }}>Alex Morgan</Text>
          <Text style={{ fontWeight: 300, fontSize: 12 }}>Delivery Person</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => router.push(`/chat/chat_001`)}
      >
        <IconAvatar
          size={50}
          icon={<AntDesign name="message1" size={24} color="black" />}
        />
      </TouchableOpacity>
    </View>
  )
}

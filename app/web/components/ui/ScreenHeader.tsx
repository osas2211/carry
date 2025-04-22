import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import { IconAvatar } from "../ui/Avatar"
import Feather from "@expo/vector-icons/Feather"
import { appColors } from "@/constants/Colors"
import { router } from "expo-router"

export const ScreenHeader = ({ title = "", bgColor = "" }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: 10,
        // marginBottom: 20,
        // padding: 0,
        backgroundColor: bgColor,
      }}
    >
      <TouchableOpacity onPress={router.back}>
        <IconAvatar
          icon={<Feather name="arrow-left" size={24} color={appColors.text} />}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 17, fontWeight: 600, color: "black" }}>
        {title}
      </Text>
    </View>
  )
}

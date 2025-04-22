import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"

export const Checkbox = ({
  onPress,
  lable,
  checked = false,
}: {
  lable?: string
  onPress?: () => void
  checked?: boolean
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
      }}
      onPress={() => {
        onPress && onPress()
      }}
    >
      <View
        style={{
          height: 25,
          width: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: appColors.grey,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: checked ? appColors?.primary : "white",
            borderRadius: 3,
          }}
        />
      </View>
      <Text style={{ fontWeight: 300, fontSize: 14 }}>{lable}</Text>
    </TouchableOpacity>
  )
}

import { View, Text, TextInput } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import AntDesign from "@expo/vector-icons/AntDesign"

export const SearchChats = () => {
  return (
    <View style={{ position: "relative" }}>
      <TextInput
        style={{
          backgroundColor: appColors.grey,
          height: 45,
          borderRadius: 20,
          paddingLeft: 40,
        }}
        placeholder="Search"
      />
      <AntDesign
        name="search1"
        size={24}
        color="#A5A5A5"
        style={{ position: "absolute", top: 10, left: 10 }}
      />
    </View>
  )
}

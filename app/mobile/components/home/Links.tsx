import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"

export const Links = () => {
  return (
    <View
      style={{ flexDirection: "row", gap: 5, justifyContent: "space-between" }}
    >
      <Link
        href={"/"}
        style={{
          alignItems: "center",
          gap: 5,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            backgroundColor: appColors.primary,
            borderRadius: 50,
          }}
        ></View>
        <Text>Pick up</Text>
      </Link>
    </View>
  )
}

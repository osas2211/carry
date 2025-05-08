import { View, Text } from "react-native"
import React from "react"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export const Empty = () => {
  return (
    <View style={{ gap: 10, alignItems: "center", paddingBlock: 20 }}>
      <Text>No data available</Text>
      <MaterialCommunityIcons name="database-off" size={34} color="black" />
    </View>
  )
}

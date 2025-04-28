import { View, Text, ColorValue } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"

export const Status = ({
  status = "pending" as
    | "pending"
    | "in-transit"
    | "completed"
    | "cancelled"
    | "failed",
}) => {
  const statusBgColor: ColorValue =
    status === "pending"
      ? appColors.pending
      : status === "completed"
      ? appColors.primary
      : status === "in-transit"
      ? appColors.blue
      : appColors.error
  const statusTextColor: ColorValue =
    status === "pending" || status === "completed" ? "black" : "white"
  return (
    <Text
      style={{
        padding: 2,
        borderRadius: 10,
        backgroundColor: statusBgColor,
        fontSize: 10,
        paddingInline: 10,
        color: statusTextColor,
        fontWeight: 600,
        elevation: 1,
        textTransform: "capitalize",
      }}
    >
      {status}
    </Text>
  )
}

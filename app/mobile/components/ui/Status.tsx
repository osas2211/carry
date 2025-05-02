import { View, Text, ColorValue } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"

export const Status = ({
  status = "pending" as
    | "pending"
    | "in-transit"
    | "completed"
    | "cancelled"
    | "failed"
    | "rejected"
    | "accepted"
    | "assigned",
}) => {
  const statusBgColor: ColorValue =
    status === "pending" || status === "assigned"
      ? appColors.pending
      : status === "completed"
      ? appColors.primary
      : status === "in-transit" || status === "accepted"
      ? appColors.blue
      : appColors.error
  const statusTextColor: ColorValue =
    status === "pending" || status === "completed" || status === "assigned"
      ? "black"
      : "white"
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

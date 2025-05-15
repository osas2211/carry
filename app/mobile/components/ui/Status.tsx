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
    | "assigned"
    | "waiting for pickup"
    | "awaiting pickup",
}) => {
  const statusBgColor: ColorValue =
    status === "pending" || status === "assigned"
      ? "#FFFAE5"
      : status === "completed"
      ? "#E8FCCF"
      : status === "in-transit" ||
        status === "accepted" ||
        status === "waiting for pickup" ||
        status === "awaiting pickup"
      ? "#D7E3FC"
      : "#FAE0E4"
  const statusTextColor: ColorValue =
    status === "pending" || status === "completed" || status === "assigned"
      ? "black"
      : "black"
  return (
    <Text
      style={{
        padding: 2,
        borderRadius: 10,
        backgroundColor: statusBgColor,
        fontSize: 10,
        paddingInline: 10,
        color: statusTextColor,
        textTransform: "capitalize",
        // maxWidth: 80,
        fontFamily: "MontserratSemiBold",
      }}
    >
      {status}
    </Text>
  )
}

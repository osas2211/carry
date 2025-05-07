import { View, Text, Image, ColorValue } from "react-native"
import React, { ReactNode } from "react"
import { appColors } from "@/constants/Colors"

export const Avatar = ({ size, src }: { size?: number; src: string }) => {
  return (
    <Image
      src={src}
      style={{
        height: size || 42,
        width: size || 42,
        borderRadius: size || 42,
        objectFit: "cover",
      }}
    />
  )
}

export const AvatarWithStatus = ({
  status,
  size,
  src,
}: {
  status: "online" | "away" | "offline"
  size?: number
  src: string
}) => {
  return (
    <View
      style={{ position: "relative", width: size || 42, height: size || 42 }}
    >
      <Avatar src={src} size={size} />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 5,
          backgroundColor:
            status === "online"
              ? appColors.success
              : status === "away"
              ? appColors.pending
              : "#A5A5A5",
          height: 10,
          width: 10,
          borderRadius: 20,
          elevation: 5,
        }}
      />
    </View>
  )
}

export const IconAvatar = ({
  icon,
  size,
  bgColor,
}: {
  icon: ReactNode
  size?: number
  bgColor?: ColorValue
}) => {
  return (
    <View
      style={{
        height: size || 45,
        width: size || 45,
        borderRadius: size || 45,
        backgroundColor: bgColor || "#fff",
        alignItems: "center",
        justifyContent: "center",
        // elevation: 1,
      }}
    >
      {icon}
    </View>
  )
}

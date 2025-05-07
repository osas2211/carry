import {
  View,
  Text,
  TouchableOpacity,
  ColorValue,
  DimensionValue,
  AnimatableNumericValue,
  ActivityIndicator,
} from "react-native"
import React, { ReactNode } from "react"
import { appColors } from "@/constants/Colors"

export const Button = ({
  onPress,
  title,
  textColor,
  bgColor,
  width,
  variant,
  height,
  borderRadius,
  fontSize,
  icon,
  disabled,
  isLoading,
}: {
  onPress?: () => void
  title: ReactNode
  textColor?: ColorValue
  bgColor?: ColorValue
  width?: DimensionValue
  variant?: "filled" | "outlined"
  height?: DimensionValue
  borderRadius?: AnimatableNumericValue
  fontSize?: number
  icon?: ReactNode
  disabled?: boolean
  isLoading?: boolean
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={!disabled ? onPress : () => {}}
      style={{
        backgroundColor:
          variant === "outlined" ? "transparent" : bgColor || "#202A25",
        height: height || 50,
        width: width || "100%",
        borderRadius: borderRadius || 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: bgColor || "#202A25",
        flexDirection: "row",
        gap: 5,
        opacity: isLoading || disabled ? 0.6 : 1,
      }}
    >
      {icon}
      {isLoading ? (
        <ActivityIndicator size={32} />
      ) : (
        <Text
          style={{
            fontSize: fontSize || 16,
            color:
              variant === "outlined"
                ? "#202A25"
                : textColor || appColors.background,
            fontFamily: "RobotoMedium",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

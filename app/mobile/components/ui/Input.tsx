import React, { ReactNode } from "react"
import { appColors } from "@/constants/Colors"
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native"

interface props extends TextInputProps {
  icon?: ReactNode
  label?: string
}
export const Input = (props: props) => {
  let baseStyle = {
    backgroundColor: appColors.grey,
    height: 50,
    borderRadius: 20,
    paddingLeft: 45,
  }
  let style: StyleProp<TextStyle> = props?.style
    ? {
        ...baseStyle,
        ...(props.style as object),
      }
    : baseStyle
  return (
    <View style={{ position: "relative" }}>
      {props.label && <Text style={{ marginBottom: 4 }}>{props.label}</Text>}
      <TextInput {...props} style={style} />
      <View
        style={{
          position: "absolute",
          top: props.label ? 34 : 15,
          left: 15,
          transform: "translateY(-0%)",
        }}
      >
        {props?.icon}
      </View>
    </View>
  )
}

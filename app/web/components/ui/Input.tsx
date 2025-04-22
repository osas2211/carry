import React, { ReactNode } from "react"
import { appColors } from "@/constants/Colors"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native"

interface props extends TextInputProps {
  icon?: ReactNode
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
      <TextInput {...props} style={style} />
      <View
        style={{
          position: "absolute",
          top: 15,
          left: 15,
          transform: "translateY(-0%)",
        }}
      >
        {props?.icon}
      </View>
    </View>
  )
}

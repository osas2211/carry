// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import AntIcons from "@expo/vector-icons/AntDesign"
import { SymbolWeight } from "expo-symbols"
import React from "react"
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native"

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "message.fill": "message1",
  "package.fill": "inbox",
  "user.fill": "user",
} as unknown as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof AntIcons>["name"]
  >
>

export type IconSymbolName = keyof typeof MAPPING

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return (
    <AntIcons
      color={color}
      size={size}
      name={MAPPING[name] as React.ComponentProps<typeof AntIcons>["name"]}
      style={style}
    />
  )
}

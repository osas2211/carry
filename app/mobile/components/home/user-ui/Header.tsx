import { View, Text } from "react-native"
import React from "react"
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { truncateText } from "@/helpers/trunctateText"
import { getItem } from "expo-secure-store"
import { USER_PUBLIC_KEY } from "@/constants/key_strings"
import { IconAvatar } from "@/components/ui/Avatar"
import { appColors } from "@/constants/Colors"
import { Button } from "@/components/ui/Button"

const Header = () => {
  const walletAddress = getItem(USER_PUBLIC_KEY)
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Entypo name="wallet" size={24} color="#5C0099" />
        <Text
          style={{
            fontSize: 10.5,
            fontWeight: 400,
            fontFamily: "MontserratMedium",
          }}
        >
          {truncateText(walletAddress || "", 8)}
        </Text>
        <Entypo name="chevron-down" size={20} color="#000" />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <IconAvatar
          icon={<Entypo name="bell" size={18} color={"#5C0099"} />}
          bgColor={appColors.grey}
          size={40}
        />
        {/* <IconAvatar
          icon={<Ionicons name="settings-outline" size={20} color="black" />}
          bgColor={appColors.primary}
          size={40}
          elevation={3}
        /> */}
      </View>
    </View>
  )
}

export default Header

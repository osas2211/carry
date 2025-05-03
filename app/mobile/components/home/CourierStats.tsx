import { View, Text } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import { IconAvatar } from "../ui/Avatar"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"

const CourierStats = () => {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <IconAvatar
            bgColor={appColors.primary}
            size={60}
            icon={
              <MaterialCommunityIcons
                name="package-variant"
                size={35}
                color="black"
              />
            }
          />
          <View>
            <Text style={{ fontWeight: 500, fontSize: 20 }}>200</Text>
            <Text style={{ fontSize: 12 }}>Total Orders</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <IconAvatar
            bgColor={appColors.primary}
            size={60}
            icon={<FontAwesome6 name="ranking-star" size={25} color="black" />}
          />
          <View>
            <Text style={{ fontWeight: 500, fontSize: 20 }}>#4th</Text>
            <Text style={{ fontSize: 12 }}>Area Ranking</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CourierStats

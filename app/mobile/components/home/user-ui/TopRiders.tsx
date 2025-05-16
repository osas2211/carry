import { View, Text, Image, ScrollView } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { useGetCouriers } from "@/hooks/api-hooks/useUser"
import { UserProfile } from "@/@types/user"
import { Avatar } from "@/components/ui/Avatar"
import { AntDesign } from "@expo/vector-icons"
import { appColors } from "@/constants/Colors"

const TopRiders = () => {
  const { data: couriers } = useGetCouriers()
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: "MontserratMedium" }}>
          Top Riders
        </Text>
        <Link href={"/"}>
          <Text style={{ fontSize: 12, fontFamily: "MontserratRegular" }}>
            See all
          </Text>
        </Link>
      </View>
      <ScrollView
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ gap: 20, flexDirection: "row" }}>
          {couriers?.map((courier, index) => {
            return <TopRiderCard key={index} courier={courier} />
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export const TopRiderCard = ({ courier }: { courier: UserProfile }) => {
  return (
    <View style={{ alignItems: "center", gap: 5 }}>
      <Avatar src={courier.avatarUrl || ""} size={60} />
      <Text style={{ fontFamily: "MontserratMedium", fontSize: 12 }}>
        {courier.username}
      </Text>
      <View
        style={{
          gap: 5,
          flexDirection: "row",
          alignItems: "center",
          marginTop: -5,
        }}
      >
        <AntDesign name="star" size={12} color={appColors.pending} />
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 10 }}>
          {Number(courier?.reputationScore || 0).toFixed(2)}
        </Text>
      </View>
    </View>
  )
}

export default TopRiders

import { View, Text, Image } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { useGetCouriers } from "@/hooks/api-hooks/useUser"
import { UserProfile } from "@/@types/user"

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
        <Text style={{ fontSize: 17 }}>Top Riders</Text>
        <Link href={"/"}>
          <Text style={{ fontSize: 12 }}>See all</Text>
        </Link>
      </View>
      <View style={{ gap: 15, flexDirection: "row" }}>
        {couriers?.map((courier, index) => {
          return <TopRiderCard key={index} courier={courier} />
        })}
      </View>
    </View>
  )
}

export const TopRiderCard = ({ courier }: { courier: UserProfile }) => {
  return (
    <View
      style={{
        elevation: 5,
        shadowColor: "#ADB5BD",
        minHeight: 170,
        width: 170,
        borderRadius: 15,
        padding: 5,
        backgroundColor: "#FDFFFC",
      }}
    >
      <Image
        src={courier?.avatarUrl || ""}
        style={{ height: 100, width: "100%", borderRadius: 15 }}
      />
    </View>
  )
}

export default TopRiders

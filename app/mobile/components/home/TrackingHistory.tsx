import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { Link, router } from "expo-router"
import { appColors } from "@/constants/Colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export const TrackingHistory = () => {
  const shipments = [
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
    },
    {
      tracking_id: 6724528398,
      item_name: "Macbook Pro M1 2023",
    },
  ]
  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 500 }}>Tracking History</Text>
        <Link href={"/shipments"}>
          <Text style={{ fontSize: 14 }}>See all</Text>
        </Link>
      </View>

      <View style={{ gap: 12 }}>
        {shipments.map((shipment, index) => {
          return (
            <TrackingItemCard
              key={index}
              item_name={shipment.item_name}
              tracking_id={shipment.tracking_id}
            />
          )
        })}
      </View>
    </View>
  )
}

const TrackingItemCard = ({ item_name = "", tracking_id = 0 }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/shipment/${tracking_id}`)}
      style={{
        backgroundColor: appColors.background,
        // elevation: 1,
        shadowColor: "#444447",
        padding: 16,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center", gap: 12, flexDirection: "row" }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            backgroundColor: "#C6C5B9",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="package-variant"
            size={24}
            color={"#393D3F"}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{item_name}</Text>
          <Text style={{ fontSize: 12, fontWeight: 300 }}>
            Tracking ID: {tracking_id}
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={"#393D3F"}
      />
    </TouchableOpacity>
  )
}

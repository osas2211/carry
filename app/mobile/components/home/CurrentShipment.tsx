import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { ShipmentSummaryCard } from "../shipments/ShipmentSummaryCard"

export const CurrentShipment = () => {
  const shipments = [
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "in-transit",
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
        <Text style={{ fontSize: 18, fontWeight: 500 }}>Current shipment</Text>
      </View>

      <View style={{ gap: 12 }}>
        {shipments.map((shipment, index) => {
          return (
            <ShipmentSummaryCard
              key={index}
              item_name={shipment.item_name}
              tracking_id={shipment.tracking_id}
              from_place={shipment.from}
              to_place={shipment.to}
              status={shipment.status as "pending"}
            />
          )
        })}
      </View>
    </View>
  )
}

import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { CourierShipmentSummaryCard } from "../shipments/CourierShipmentCard"

export const CourierShipments = () => {
  const shipments = [
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "accepted",
    },

    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "completed",
    },
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "assigned",
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
        <Text style={{ fontSize: 18, fontWeight: 500 }}>Shipments</Text>
      </View>

      <View style={{ gap: 20 }}>
        {shipments.map((shipment, index) => {
          return (
            <CourierShipmentSummaryCard
              key={index}
              item_name={shipment.item_name}
              tracking_id={shipment.tracking_id}
              from_place={shipment.from}
              to_place={shipment.to}
              status={shipment.status as "accepted"}
            />
          )
        })}
      </View>
    </View>
  )
}

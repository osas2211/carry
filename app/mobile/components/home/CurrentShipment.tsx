import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { ShipmentSummaryCard } from "../shipments/ShipmentSummaryCard"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"

export const CurrentShipment = () => {
  const { data, isLoading } = useGetUserShipments()
  const shipments = data?.data
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

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ gap: 12 }}>
          {shipments?.slice(0, 1).map((shipment, index) => {
            return (
              <ShipmentSummaryCard
                key={index}
                item_name={shipment.packageType || "Package"}
                tracking_id={shipment.id}
                from_place={shipment.pickupAddress}
                to_place={shipment.dropoffAddress}
                status={shipment.status}
                withBlueBg={true}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}

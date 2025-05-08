import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Feather from "@expo/vector-icons/Feather"
import Ionicons from "@expo/vector-icons/Ionicons"
import { CourierShipmentSummaryCard } from "../shipments/CourierShipmentCard"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"
import { Empty } from "../ui/Empty"

export const CourierShipments = () => {
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
        <Text style={{ fontSize: 18, fontWeight: 500 }}>Shipments</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {shipments?.length === 0 ? (
            <Empty />
          ) : (
            <View style={{ gap: 12 }}>
              {shipments?.slice(0, 1).map((shipment, index) => {
                return (
                  <CourierShipmentSummaryCard
                    key={index}
                    item_name={shipment.packageType || "Package"}
                    tracking_id={shipment.id}
                    from_place={shipment.pickupAddress}
                    to_place={shipment.dropoffAddress}
                    status={shipment.status}
                  />
                )
              })}
            </View>
          )}
        </>
      )}
    </View>
  )
}

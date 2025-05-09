import { View, Text, ActivityIndicator } from "react-native"
import React from "react"
import { ShipmentSummaryCard } from "./ShipmentSummaryCard"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"

export const AllShipments = () => {
  const { data, isLoading } = useGetUserShipments()
  const shipments = data?.data
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ gap: 12 }}>
          {shipments?.map((shipment, index) => {
            return (
              <ShipmentSummaryCard
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
    </View>
  )
}

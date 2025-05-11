import { View, Text } from "react-native"
import React, { useEffect } from "react"
import { Map } from "../ui/Map"
import { ContactDeliveryPerson } from "./ContactDeliveryPerson"
import { useLocalSearchParams } from "expo-router"
import {
  useGetSingleShipment,
  useGetUserShipments,
} from "@/hooks/api-hooks/useDeliveryJobs"
import { socket } from "@/helpers/socket"

export const LiveTracking = () => {
  const { tracking_id } = useLocalSearchParams()
  const {
    data: shipment,
    isLoading,
    refetch,
  } = useGetSingleShipment(tracking_id as string)
  const { refetch: refetchAll } = useGetUserShipments()

  useEffect(() => {
    socket.on(`shipment-status-${tracking_id}`, (data) => {
      refetch()
      refetchAll()
    })
  })
  return (
    <View style={{ height: "100%" }}>
      <View>
        <Map rounded={false} height={550} />
      </View>
      <View style={{ padding: 16, gap: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: 500 }}>
          Shipment Infomation {tracking_id}
        </Text>
        <View
          style={{
            padding: 16,
            // height: 80,
            borderRadius: 10,
            backgroundColor: "#F2F2F2",
            elevation: 1,
            shadowColor: "#A5A5A5",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontWeight: 300 }}>
              Estimated delivery time
            </Text>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>1hr 37mins</Text>
          </View>

          <View>
            <Text style={{ fontSize: 13, fontWeight: 300 }}>Status</Text>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>
              {shipment?.status === "PICKED_UP"
                ? "In Transit"
                : shipment?.status}
            </Text>
          </View>
        </View>

        <ContactDeliveryPerson />
      </View>
    </View>
  )
}

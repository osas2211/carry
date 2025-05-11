import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Map } from "../ui/Map"
import { ContactDeliveryPerson } from "./ContactDeliveryPerson"
import { useLocalSearchParams } from "expo-router"
import {
  useGetSingleShipment,
  useGetUserShipments,
} from "@/hooks/api-hooks/useDeliveryJobs"
import { socket } from "@/helpers/socket"
import Geocoder from "react-native-geocoding"

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
  const [fromLocation, setFromLocation] = useState({ lat: 0, lng: 0 })
  const [toLocation, setToLocation] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    if (shipment) {
      Geocoder.from(shipment?.pickupAddress || "")
        .then((json) => {
          const location = json.results[0].geometry.location
          setFromLocation(location)
        })
        .catch((error) => console.warn(error))

      Geocoder.from(shipment?.dropoffAddress || "")
        .then((json) => {
          const location = json.results[0].geometry.location
          setToLocation(location)
        })

        .catch((error) => console.warn(error))
    }
  }, [shipment])

  // Search by address

  return (
    <View style={{ height: "100%" }}>
      <View>
        {shipment && (
          <Map
            rounded={false}
            height={550}
            from_cordinate={fromLocation}
            to_cordinate={toLocation}
          />
        )}
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

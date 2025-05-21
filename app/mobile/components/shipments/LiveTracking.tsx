import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { Map } from "../ui/Map"
import { ContactDeliveryPerson } from "./ContactDeliveryPerson"
import { router, useLocalSearchParams } from "expo-router"
import {
  useGetSingleShipment,
  useGetUserShipments,
} from "@/hooks/api-hooks/useDeliveryJobs"
import { socket } from "@/helpers/socket"
import Geocoder from "react-native-geocoding"
import { Dimensions } from "react-native"
import LiveTrackingDetails from "./LiveTrackingDetails"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { IconAvatar } from "../ui/Avatar"
import Feather from "@expo/vector-icons/Feather"
import { appColors } from "@/constants/Colors"

const screen = Dimensions.get("screen")

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
    <GestureHandlerRootView style={{ flex: 1, height: "100%" }}>
      <View style={{ height: "100%", flex: 1 }}>
        <View style={{ height: "100%", flex: 1, position: "relative" }}>
          {shipment && (
            <Map
              rounded={false}
              height={screen.height}
              from_cordinate={fromLocation}
              to_cordinate={toLocation}
            />
          )}
          <View
            style={{ position: "absolute", top: 40, left: 20, elevation: 10 }}
          >
            <TouchableOpacity onPress={router.back} activeOpacity={0.7}>
              <IconAvatar
                elevation={10}
                icon={
                  <Feather name="arrow-left" size={24} color={appColors.text} />
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ padding: 16, gap: 15 }}>
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
      </View> */}
      </View>
      {shipment && <LiveTrackingDetails shipment={shipment} />}
    </GestureHandlerRootView>
  )
}

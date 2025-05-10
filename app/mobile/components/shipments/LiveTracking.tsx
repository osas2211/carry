import { View, Text } from "react-native"
import React from "react"
import { Map } from "../ui/Map"
import { ContactDeliveryPerson } from "./ContactDeliveryPerson"
import { useLocalSearchParams } from "expo-router"

export const LiveTracking = () => {
  const { tracking_id } = useLocalSearchParams()
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
            <Text style={{ fontSize: 15, fontWeight: 500 }}>In Transit</Text>
          </View>
        </View>

        <ContactDeliveryPerson />
      </View>
    </View>
  )
}

import { View, Text } from "react-native"
import React from "react"
import { ShipmentMetaInfo } from "./ShipmentMetaInfo"
import { Timeline } from "./Timeline"

export const ShipmentDetails = () => {
  return (
    <View style={{ gap: 10 }}>
      <ShipmentMetaInfo
        {...{
          tracking_id: 6724528398,
          item_name: "Dell Precision 15 5570",
          from_place: "34 New York street.",
          to_place: "486 Dela ware avenue",
          status: "cancelled",
        }}
      />
      <Timeline
        {...{
          tracking_id: 6724528398,
          item_name: "Dell Precision 15 5570",
          from_place: "34 New York street.",
          to_place: "486 Dela ware avenue",
          status: "in-transit",
        }}
      />
    </View>
  )
}

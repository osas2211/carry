import { View, Text } from "react-native"
import React from "react"
import { ShipmentSummaryCard } from "./ShipmentSummaryCard"

export const AllShipments = () => {
  const shipments = [
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "in-transit",
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
      status: "pending",
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
      status: "completed",
    },
    {
      tracking_id: 6724528398,
      item_name: "Dell Precision 15 5570",
      from: "34 New York street.",
      to: "486 Dela ware avenue",
      status: "failed",
    },
  ]
  return (
    <View>
      <View style={{ gap: 12, paddingBottom: 50 }}>
        {shipments.map((shipment, index) => {
          return (
            <ShipmentSummaryCard
              key={index}
              item_name={shipment.item_name}
              tracking_id={shipment.tracking_id}
              from_place={shipment.from}
              to_place={shipment.to}
              status={shipment.status as "pending"}
              lineHeight={30}
            />
          )
        })}
      </View>
    </View>
  )
}

import { View, Text } from "react-native"
import React from "react"
import Tab from "./Tab"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"
import shipments from "@/app/(tabs)/shipments"
import { JobStatus } from "@/@types/delivery_jobs"
import ShipmentCard from "./ShipmentCard"
import { Dimensions } from "react-native"

const UserShipments = () => {
  const { data, isLoading } = useGetUserShipments()
  const in_progress =
    data?.data?.filter(
      (shipment) =>
        shipment.status !== JobStatus.CANCELLED &&
        shipment.status !== JobStatus.DELIVERED
    ) || []
  const completed =
    data?.data?.filter((shipment) => shipment.status === JobStatus.DELIVERED) ||
    []
  const cancelled =
    data?.data?.filter((shipment) => shipment.status === JobStatus.CANCELLED) ||
    []
  const tabItems = {
    "In Progress": (
      <View style={{ gap: 25 }}>
        {in_progress?.map((shipment, key) => {
          return <ShipmentCard key={key} shipment={shipment} />
        })}
      </View>
    ),
    Completed: (
      <View style={{ gap: 25 }}>
        {completed?.map((shipment, key) => {
          return <ShipmentCard key={key} shipment={shipment} />
        })}
      </View>
    ),
    Cancelled: (
      <View style={{ gap: 25 }}>
        {cancelled?.map((shipment, key) => {
          return <ShipmentCard key={key} shipment={shipment} />
        })}
      </View>
    ),
  }
  return (
    <View
      style={{
        zIndex: 100,
        marginTop: -0,
        position: "relative",
        minHeight: 620,
      }}
    >
      <Tab data={tabItems} />
    </View>
  )
}

export default UserShipments

import { View, Text } from "react-native"
import React from "react"
import { TrackOrder } from "./TrackOrder"
import { TrackingHistory } from "./TrackingHistory"
import { CurrentShipment } from "./CurrentShipment"

const NormalUserHome = () => {
  return (
    <>
      <TrackOrder />
      <TrackingHistory />
      <CurrentShipment />
    </>
  )
}

export default NormalUserHome

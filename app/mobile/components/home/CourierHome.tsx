import { View, Text } from "react-native"
import React from "react"
import { TrackOrder } from "./TrackOrder"
import { TrackingHistory } from "./TrackingHistory"
import { CurrentShipment } from "./CurrentShipment"
import HomeHeader from "./Header"
import { CourierShipments } from "./CourierShipments"
import CourierStats from "./CourierStats"

const CourierHome = () => {
  return (
    <>
      <HomeHeader />
      <CourierStats />
      <CourierShipments />
    </>
  )
}

export default CourierHome

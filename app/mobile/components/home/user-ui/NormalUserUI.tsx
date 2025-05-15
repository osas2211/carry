import { View, Text } from "react-native"
import React from "react"
import Header from "./Header"
import { appColors } from "@/constants/Colors"
import Ad from "./Ad"
import Options from "./Options"
import TopRiders from "./TopRiders"
import CurrentShipment from "./CurrentShipment"
import TrackingHistory from "./TrackingHistory"

const NormalUserUI = () => {
  return (
    <View style={{ backgroundColor: appColors.grey, gap: 8 }}>
      <View
        style={{ padding: 16, gap: 15, backgroundColor: appColors.background }}
      >
        <Header />
        <Ad />
        <Options />
        <CurrentShipment />
      </View>
      <View
        style={{ padding: 16, gap: 15, backgroundColor: appColors.background }}
      >
        <TrackingHistory />
      </View>
    </View>
  )
}

export default NormalUserUI

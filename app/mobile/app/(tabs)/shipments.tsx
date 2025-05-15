import { View, Text, ScrollView } from "react-native"
import React from "react"
import { AllShipments } from "@/components/shipments/AllShipments"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { appColors } from "@/constants/Colors"
import UserShipments from "@/components/shipments/shipmentTab.tsx/UserShipments"

const shipments = () => {
  return (
    <View
      style={{
        padding: 16,
        paddingTop: 20,
        gap: 20,
        position: "relative",
        backgroundColor: appColors.background,
      }}
    >
      <ScreenHeader title="Shipments History" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <AllShipments /> */}
        <UserShipments />
      </ScrollView>
    </View>
  )
}

export default shipments

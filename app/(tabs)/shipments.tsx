import { View, Text, ScrollView } from "react-native"
import React from "react"
import { AllShipments } from "@/components/shipments/AllShipments"
import { ScreenHeader } from "@/components/ui/ScreenHeader"

const shipments = () => {
  return (
    <View
      style={{ padding: 16, paddingTop: 20, gap: 20, position: "relative" }}
    >
      <ScreenHeader title="Shipments History" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AllShipments />
      </ScrollView>
    </View>
  )
}

export default shipments

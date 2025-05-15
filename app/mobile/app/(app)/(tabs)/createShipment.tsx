import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native"
import React from "react"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import CreateForm from "@/components/shipments/create_shipment/CreateForm"

export default function createShipment() {
  return (
    <View
      style={{
        padding: 16,
        paddingTop: 20,
        gap: 20,
        position: "relative",
        backgroundColor: "#fff",
        minHeight: "100%",
        paddingBottom: 50,
      }}
    >
      <ScreenHeader title="Create shipment" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <CreateForm />
      </ScrollView>
    </View>
  )
}

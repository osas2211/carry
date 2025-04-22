import { View, Text, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack } from "expo-router"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { ShipmentDetails } from "@/components/shipments/ShipmentDetails"

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <View style={{ paddingInline: 16, paddingBottom: 50, gap: 15 }}>
          <ScreenHeader title="Shipment Details" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ShipmentDetails />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

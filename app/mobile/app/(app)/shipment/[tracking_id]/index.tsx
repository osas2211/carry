import { View, Text, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack } from "expo-router"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { ShipmentDetails } from "@/components/shipments/ShipmentDetails"
import Geocoder from "react-native-geocoding"

// Initialize the module (needs to be done only once)
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "")

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <View style={{ gap: 15 }}>
          <View style={{ paddingInline: 16, padding: 16 }}>
            <ScreenHeader title="Shipment Details" />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ShipmentDetails />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

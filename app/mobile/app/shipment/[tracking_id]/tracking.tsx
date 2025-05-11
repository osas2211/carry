import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { LiveTracking } from "@/components/shipments/LiveTracking"
import Geocoder from "react-native-geocoding"

// Initialize the module (needs to be done only once)
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "")

export default function tracking() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        
      </SafeAreaView> */}
      <View style={{ paddingBottom: 0, gap: 15, flex: 1 }}>
        {/* <View style={{ paddingInline: 16 }}>
          <ScreenHeader title="Live Tracking" />
        </View> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <LiveTracking />
        </ScrollView>
      </View>
    </>
  )
}

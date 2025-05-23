import { View, Text, ScrollView } from "react-native"
import React from "react"
import { ScreenHeader } from "@/components/ui/ScreenHeader"
import { Stack } from "expo-router"
import CourierOnboardingForm from "@/components/onboarding/CourierForm"

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
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
        <ScreenHeader title="Join as Courier" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CourierOnboardingForm />
        </ScrollView>
      </View>
    </>
  )
}

import { Image, Text, View } from "react-native"
import React, { Component, useState } from "react"
import { onboardingStyle } from "@/styles/onboarding"
// @ts-ignore
import deliveryImg from "../../assets/images/onboarding/delivery-man.png"
import { appColors } from "@/constants/Colors"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { router, Stack } from "expo-router"
import { Button } from "@/components/ui/Button"

export default function index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView>
        <ScrollView
          style={{
            paddingInline: 20,
            // paddingTop: "0%",
            position: "relative",
            ...onboardingStyle.fullScreen,
            backgroundColor: appColors.background,
          }}
        >
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 40 }}
          >
            {/* <Text style={{ fontWeight: 800, fontSize: 20 }}>SpeedFi</Text> */}
            <Image source={deliveryImg} style={{ width: 350, height: 350 }} />
            <View style={{ gap: 10, paddingInline: 20 }}>
              <Text
                style={{
                  fontSize: 32,
                  textAlign: "center",
                  color: appColors.text,
                  fontFamily: "RobotoSemiBold",
                  lineHeight: 34,
                  marginBottom: 0,
                }}
              >
                A Decentralized Delivery Network.
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: appColors.text,
                  fontFamily: "RobotoRegular",
                }}
              >
                SpeedFi connects local couriers and warehouses, retailers and
                direct consumers into a fast, decentralized delivery network. No
                middlemen, just efficiency.
              </Text>
            </View>

            <View style={{ flexDirection: "column", width: "100%", gap: 12 }}>
              <Button
                title={"Join as Customer"}
                variant="outlined"
                onPress={() => router.push("/onboarding/user")}
              />
              <Button
                title="Join as Courier"
                onPress={() => router.push("/onboarding/rider")}
              />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  )
}

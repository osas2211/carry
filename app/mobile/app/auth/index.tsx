import { Image, Text, View } from "react-native"
import React, { useState } from "react"
import { onboardingStyle } from "@/styles/onboarding"
// @ts-ignore
import { appColors } from "@/constants/Colors"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { router, Stack } from "expo-router"
import { Dimensions } from "react-native"
const screen = Dimensions.get("screen")

import { SignInButton } from "@/components/sign-in/sign-in"

export default function Onboarding() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <GestureHandlerRootView>
        <ScrollView
          style={{
            // marginBlock: 30,
            paddingInline: 20,
            // paddingTop: "0%",
            position: "relative",
            ...onboardingStyle.fullScreen,
            backgroundColor: appColors.background,
          }}
        >
          <View
            style={{
              gap: 20,
              justifyContent: "center",
              height: "100%",
            }}
          >
            {/* <Text style={{ fontWeight: 800, fontSize: 20 }}>Carry</Text> */}
            <Image
              source={require("../../assets/images/onboarding/courier_.jpg")}
              style={{
                width: 420,
                height: screen.height * 0.65,
                // objectFit: "contain",
                alignSelf: "center",
              }}
            />
            <View style={{ gap: 0, paddingInline: 0, alignItems: "center" }}>
              <View>
                <Image
                  source={require("../../assets/images/icon-full.png")}
                  style={{
                    height: 30,
                    width: 100,
                    objectFit: "contain",
                    marginTop: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: appColors.text,
                  fontFamily: "MontserratMedium",
                  marginBottom: 0,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                A Decentralized and Community Driven Delivery Network.
              </Text>
            </View>

            <View style={{ flexDirection: "column", width: "100%", gap: 12 }}>
              {/* <Button
                title={connecting ? "Connecting..." : "Connect"}
                variant="outlined"
                onPress={handleWalletConnection}
              /> */}

              <SignInButton />
              {/* <Button title="Get started" onPress={handleGetStarted} /> */}
              <Text
                style={{
                  color: appColors.text,
                  fontFamily: "MontserratRegular",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                The power of the{" "}
                <Text
                  style={{
                    color: appColors.primary,
                    fontFamily: "MontserratBold",
                  }}
                >
                  world
                </Text>{" "}
                in the palm of your hand.
              </Text>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  )
}

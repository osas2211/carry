import { Image, Text, View } from "react-native"
import React, { useState } from "react"
import { onboardingStyle } from "@/styles/onboarding"
// @ts-ignore
import deliveryImg from "../../assets/images/onboarding/delivery-man.png"
import { Button } from "@/components/ui/Button"
import { appColors } from "@/constants/Colors"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { router, Stack } from "expo-router"
import { saveValue } from "@/helpers/secureStoreHelpers"
import { HAS_ONBOARDED } from "@/constants/key_strings"
import { connectWallet } from "@/helpers/connectWallet"

export default function Onboarding() {
  const [connecting, setConnecting] = useState(false)

  const handleWalletConnection = async () => {
    try {
      setConnecting(true)
      await connectWallet()
      await saveValue(HAS_ONBOARDED, "true")
      router.replace("/")
    } catch (error) {
      alert(`${JSON.stringify(error)}`)
      setConnecting(false)
    } finally {
      setConnecting(false)
    }
  }
  const handleGetStarted = async () => {
    router.push("/onboarding")
  }
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
                title={connecting ? "Connecting..." : "Connect"}
                variant="outlined"
                onPress={handleWalletConnection}
              />
              <Button title="Get started" onPress={handleGetStarted} />
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  )
}

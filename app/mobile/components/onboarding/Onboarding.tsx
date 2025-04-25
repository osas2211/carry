import { Image, Text, View } from "react-native"
import React, { Component, useState } from "react"
import { onboardingStyle } from "@/styles/onboarding"

// @ts-ignore
import onboardingImg3 from "../../assets/images/onboarding/onboarding-3.png"

// @ts-ignore
import deliveryImg from "../../assets/images/onboarding/delivery-man.png"
// @ts-ignore
import onboardingImg1 from "../../assets/images/onboarding/onboarding-1.png"
import { Button } from "../ui/Button"
import { appColors } from "@/constants/Colors"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { Link } from "expo-router"
import { getValue, saveValue } from "@/helpers/secureStoreHelpers"
import {
  AUTH_TOKEN,
  HAS_ONBOARDED,
  USER_PUBLIC_KEY,
} from "@/constants/key_strings"
import { connectWallet } from "@/helpers/connectWallet"

export default function Onboarding({
  setHasOnboarded,
}: {
  setHasOnboarded: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [connecting, setConnecting] = useState(false)

  const handleWalletConnection = async () => {
    try {
      setConnecting(true)
      await connectWallet()
      await saveValue(HAS_ONBOARDED, "true")
      setHasOnboarded(true)
    } catch (error) {
      alert(`${JSON.stringify(error)}`)
      setConnecting(false)
    } finally {
      setConnecting(false)
    }
  }
  const handleGetStarted = async () => {
    await saveValue(HAS_ONBOARDED, "false")
    // setHasOnboarded(true)
  }
  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{
          marginBlock: 30,
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
          {/* <Text style={{ fontWeight: 800, fontSize: 20 }}>DeliChain</Text> */}
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
              DeliChain connects local couriers and warehouses, retailers and
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
  )
}

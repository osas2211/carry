import { Image, Text, View } from "react-native"
import React, { useState } from "react"
import { onboardingStyle } from "@/styles/onboarding"
// @ts-ignore
import deliveryImg from "../../assets/images/onboarding/courier.jpg"
import { Button } from "@/components/ui/Button"
import { appColors } from "@/constants/Colors"
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { router, Stack } from "expo-router"
import { getValue, saveValue } from "@/helpers/secureStoreHelpers"
import { HAS_ONBOARDED, USER_PUBLIC_KEY } from "@/constants/key_strings"
import { connectWallet } from "@/helpers/connectWallet"
import { api } from "@/api/api.instance"

export default function Onboarding() {
  const [connecting, setConnecting] = useState(false)

  const handleWalletConnection = async () => {
    try {
      setConnecting(true)
      await connectWallet()
      await saveValue(HAS_ONBOARDED, "true")
      router.replace("/")
      const pubKey = await getValue(USER_PUBLIC_KEY)
      const data = await api.get(`/users/${pubKey}`)
      // console.log(data.data)
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
            paddingTop: 60,
            // paddingTop: "0%",
            position: "relative",
            ...onboardingStyle.fullScreen,
            backgroundColor: appColors.background,
          }}
        >
          <View style={{ gap: 20, justifyContent: "center", height: "100%" }}>
            {/* <Text style={{ fontWeight: 800, fontSize: 20 }}>SpeedFi</Text> */}
            <Image
              source={deliveryImg}
              style={{
                width: 420,
                height: 300,
                objectFit: "contain",
                alignSelf: "center",
              }}
            />
            <View style={{ gap: 10, paddingInline: 0 }}>
              <Text>Logo</Text>
              <Text
                style={{
                  fontSize: 24,
                  color: appColors.text,
                  fontFamily: "RobotoSemiBold",
                  lineHeight: 27,
                  marginBottom: 0,
                }}
              >
                A Decentralized and Community Driven Delivery Network.
              </Text>
              <Text
                style={{
                  color: appColors.text,
                  fontFamily: "RobotoRegular",
                  fontSize: 13,
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

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
// import { getValue, saveValue } from "@/helpers/secureStoreHelpers"
// import {
//   HAS_ONBOARDED,
//   USER_PUBLIC_KEY,
//   USER_ROLE,
// } from "@/constants/key_strings"
// import { connectWallet } from "@/helpers/connectWallet"
// import { api } from "@/api/api.instance"
// import { AxiosError } from "axios"
// import { UserProfile } from "@/@types/user"
import { SignInButton } from "@/components/sign-in/sign-in"

export default function Onboarding() {
  const [connecting, setConnecting] = useState(false)

  // const handleWalletConnection = async () => {
  //   try {
  //     setConnecting(true)
  //     await connectWallet()
  //     const pubKey = await getValue(USER_PUBLIC_KEY)
  //     const data: UserProfile = (await api.get(`/users/${pubKey}`)).data
  //     saveValue(USER_ROLE, data.role)
  //     // console.log("COnnected")
  //     await saveValue(HAS_ONBOARDED, "true")
  //     router.replace("/")
  //   } catch (error: any) {
  //     console.log(error?.message)
  //     if (error?.status == 404) {
  //       router.push("/onboarding")
  //     }
  //     setConnecting(false)
  //   } finally {
  //     setConnecting(false)
  //   }
  // }
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
            {/* <Text style={{ fontWeight: 800, fontSize: 20 }}>Carry</Text> */}
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
                Carry connects local couriers and warehouses, retailers and
                direct consumers into a fast, decentralized delivery network. No
                middlemen, just efficiency.
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
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  )
}

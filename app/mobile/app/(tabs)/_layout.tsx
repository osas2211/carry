import { router, Tabs } from "expo-router"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Platform, Text, View } from "react-native"
import Feather from "@expo/vector-icons/Feather"
import { HapticTab } from "@/components/HapticTab"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { appColors, Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { getValue, saveValue } from "@/helpers/secureStoreHelpers"
import {
  AUTH_TOKEN,
  SERVER_AUTH_TOKEN,
  USER_ROLE,
} from "@/constants/key_strings"
import { UserRole } from "@/@types/user"
import { getItem } from "expo-secure-store"
import { SafeAreaView } from "react-native-safe-area-context"

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const role = getItem(USER_ROLE) as UserRole.COURIER | UserRole.NORMAL_USER
  const checkToken = async () => {
    // await saveValue(SERVER_AUTH_TOKEN, "")
    const token = await getValue(SERVER_AUTH_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      router.replace("/auth")
    } else {
      setIsAuthorized(true)
    }
  }
  useEffect(() => {
    checkToken()
  }, [])
  return (
    <>
      <SafeAreaView style={{ flex: 1, position: "relative" }} edges={["top"]}>
        {!isAuthorized ? (
          <View>
            {/* <Text>Checking auth...</Text> */}
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: appColors.primary,
                tabBarInactiveTintColor: "#ADB5BD",
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                  ...Platform.select({
                    ios: {
                      // Use a transparent background on iOS to show the blur effect
                      position: "absolute",
                    },
                    default: {
                      position: "fixed",
                    },
                  }),
                  borderTopWidth: 0,
                  backgroundColor: appColors.text,
                  marginInline: 20,
                  borderRadius: 50,
                  height: 60,
                  shadowOpacity: 0,
                  elevation: 0,
                  alignItems: "center",
                  paddingTop: 3,
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: "Home",
                  tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="house.fill" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="shipments"
                options={{
                  title: "Shipments",
                  tabBarIcon: ({ color }) => (
                    <Feather size={28} name="package" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="createShipment"
                options={{
                  title: "Create",
                  tabBarIcon: ({ color }) => (
                    <Feather size={28} name="plus" color={color} />
                  ),
                  tabBarItemStyle: {
                    display: role === UserRole.COURIER ? "none" : "flex",
                  },
                }}
              />

              <Tabs.Screen
                name="chats"
                options={{
                  title: "Chats",
                  tabBarIcon: ({ color }) => (
                    <IconSymbol size={28} name="message.fill" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="profile"
                options={{
                  title: "Profile",
                  tabBarIcon: ({ color }) => (
                    // @ts-ignore
                    <IconSymbol size={28} name="user.fill" color={color} />
                  ),
                }}
              />
            </Tabs>
            {/* <View
            style={{
              height: 60,
              width: "95%",
              backgroundColor: appColors.primary,
              position: "absolute",
              bottom: 0,
              left: 0,
              marginInline: 10,
              zIndex: -1,
              borderRadius: 50,
            }}
          ></View> */}
          </>
        )}
      </SafeAreaView>
    </>
  )
}

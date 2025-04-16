import { Tabs } from "expo-router"
import React from "react"
import { Platform } from "react-native"
import Feather from "@expo/vector-icons/Feather"
import { HapticTab } from "@/components/HapticTab"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { appColors, Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
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
            backgroundColor: "#212529",
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
    </>
  )
}

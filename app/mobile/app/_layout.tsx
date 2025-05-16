import "react-native-get-random-values"
import "@/polyfills";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import "react-native-reanimated"
import {
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { useColorScheme } from "@/hooks/useColorScheme"
import { SafeAreaView } from "react-native-safe-area-context"
import { getValue } from "@/helpers/secureStoreHelpers"
import { HAS_ONBOARDED } from "@/constants/key_strings"
import { AlertNotificationRoot } from "react-native-alert-notification"
import PushNotifcationRoot from "@/components/roots/PushNotifcationRoot"
import Geocoder from "react-native-geocoding"
import { ClusterProvider } from "@/components/cluster/cluster-data-access";
import { ConnectionProvider } from "@/utils/ConnectionProvider";

// Initialize the module (needs to be done only once)
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "")

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    MontserratExtraLight: Montserrat_200ExtraLight,
    MontserratLight: Montserrat_300Light,
    MontserratRegular: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  })

  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    const checkOnboarding = async () => {
      setLoading(true)
      const value = await getValue(HAS_ONBOARDED)
      setHasOnboarded(value === "true")
      setLoading(false)
    }
    checkOnboarding()
  }, [hasOnboarded])

  if (!loaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClusterProvider>
        <ConnectionProvider config={{ commitment: "processed" }}>
          <PushNotifcationRoot>
            <AlertNotificationRoot>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <>
                  {/* <SafeAreaView
              style={{ flex: 1, position: "relative" }}
              edges={["top"]}
            >
              
            </SafeAreaView> */}
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </>
                <StatusBar style="auto" />
              </ThemeProvider>
            </AlertNotificationRoot>
          </PushNotifcationRoot>
        </ConnectionProvider>
      </ClusterProvider>
    </QueryClientProvider>
  )
}

import "react-native-get-random-values"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import "react-native-reanimated"
import {
  Roboto_200ExtraLight,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

import { useColorScheme } from "@/hooks/useColorScheme"
import { ActivityIndicator, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getValue } from "@/helpers/secureStoreHelpers"
import { HAS_ONBOARDED } from "@/constants/key_strings"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    RobotoExtraLight: Roboto_200ExtraLight,
    RobotoLight: Roboto_300Light,
    RobotoRegular: Roboto_400Regular,
    RobotoMedium: Roboto_500Medium,
    RobotoSemiBold: Roboto_600SemiBold,
    RobotoBold: Roboto_700Bold,
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <>
          <SafeAreaView
            style={{ flex: 1, position: "relative" }}
            edges={["top"]}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaView>
        </>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

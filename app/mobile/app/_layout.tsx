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

import { useColorScheme } from "@/hooks/useColorScheme"
import Onboarding from "@/components/onboarding/Onboarding"
import { ActivityIndicator, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { getValue } from "@/helpers/secureStoreHelpers"

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

  const [hasOnboarded, setHasOnboarded] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  useEffect(() => {
    const checkOnboarding = async () => {
      setLoading(true)
      const value = await getValue("hasOnboarded_s")
      setHasOnboarded(value === "true")
      setLoading(false)
    }
    checkOnboarding()
    return () => {
      null
    }
  }, [])

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {loading ? (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          {hasOnboarded ? (
            <>
              <SafeAreaView
                style={{ flex: 1, position: "relative" }}
                edges={["top"]}
              >
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </SafeAreaView>
            </>
          ) : (
            <>{<Onboarding setHasOnboarded={setHasOnboarded} />}</>
          )}
        </>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

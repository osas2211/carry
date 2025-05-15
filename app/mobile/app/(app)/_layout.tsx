import { AuthBoundary } from "@privy-io/expo";
// import "react-native-get-random-values"
import { Href, Redirect, Stack } from "expo-router"
import React from "react";

export default function AppLayout() {
  return (
    <AuthBoundary
      loading={<Stack.Screen name="+Loader" />}
      error={(error) => <Stack.Screen name="+not-found" />} // switch to error screen
      unauthenticated={<Redirect href={"/auth" as Href} />}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthBoundary >
  )
}

import React from "react"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Dimensions, StyleSheet, View } from "react-native"
import MapViewDirections from "react-native-maps-directions"
import { appColors } from "@/constants/Colors"
import { haversineDistance } from "@/helpers/haversineDistance"
const screen = Dimensions.get("window")

export function Map({
  rounded = true,
  height = 230,
  from_cordinate = { lat: 0, lng: 0 },
  to_cordinate = { lat: 0, lng: 0 },
}) {
  const distanceKm = haversineDistance(
    from_cordinate.lat,
    from_cordinate.lng,
    to_cordinate.lat,
    to_cordinate.lng
  )
  const ASPECT_RATIO = screen.width / height
  const LATITUDE_DELTA = distanceKm / 90
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
  return (
    <View style={{ ...styles.container, borderRadius: rounded ? 15 : 0 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ ...styles.map, height }}
        // initialRegion={{
        //   latitude: lat,
        //   longitude: lng,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        loadingEnabled
        region={{
          latitude: from_cordinate.lat,
          longitude: from_cordinate.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={{
            latitude: from_cordinate.lat,
            longitude: from_cordinate.lng,
          }}
        />
        <Marker
          coordinate={{
            latitude: to_cordinate.lat,
            longitude: to_cordinate.lng,
          }}
        />
        <MapViewDirections
          origin={{
            latitude: from_cordinate.lat,
            longitude: from_cordinate.lng,
          }}
          destination={{
            latitude: to_cordinate.lat,
            longitude: to_cordinate.lng,
          }}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          strokeWidth={5}
          strokeColor={appColors.blue}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    width: "100%",
  },
})

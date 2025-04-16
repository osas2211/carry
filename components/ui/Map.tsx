import React from "react"
import MapView from "react-native-maps"
import { StyleSheet, View } from "react-native"

export function Map({ rounded = true, height = 230 }) {
  return (
    <View style={{ ...styles.container, borderRadius: rounded ? 15 : 0 }}>
      <MapView
        style={{ ...styles.map, height }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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

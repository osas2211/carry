import { View, Text, StyleSheet, Animated } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import Foundation from "@expo/vector-icons/Foundation"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Button } from "./Button"

export const ConfirmShipment = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Animated.View>
      <Text style={{ fontSize: 24, fontWeight: 600 }}>Confirm Shipment</Text>
      <Text style={{ fontWeight: 300 }}>Kindly review your shipment</Text>

      <View style={{ marginBlock: 20, gap: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>Shipment Details</Text>
        <View
          style={{
            padding: 18,
            borderRadius: 10,
            minHeight: 100,
            backgroundColor: appColors.grey,
            gap: 14,
          }}
        >
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Pickup Location</Text>
            <Text style={styles.midText}>84 Mushin road, Lagos</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Dropoff Location</Text>
            <Text style={styles.midText}>183 Oke-afa isolo, Lagos</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Distance</Text>
            <Text style={styles.midText}>4.5km</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Package Type</Text>
            <Text style={styles.midText}>Food</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Fragile</Text>
            <Text style={styles.midText}>Package is fragile</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Temperature Sensitive</Text>
            <Text style={styles.midText}>Not temperature sensitive</Text>
          </View>
          {/* <View>
            <Text style={styles.smallText}>Note</Text>
            <Text>N/A</Text>
          </View> */}
        </View>
      </View>

      <View style={{ paddingBottom: 20, paddingTop: 10 }}>
        <View
          style={{
            width: "100%",
            height: 1,
            borderStyle: "dashed",
            borderTopWidth: 1,
            opacity: 0.1,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            opacity: 0.3,
            paddingBlock: 12,
          }}
        >
          <Foundation name="info" size={24} color="black" />
          <Text style={{ fontSize: 13, maxWidth: "87%" }}>
            Shipping cost is calculated based on distance and the type of
            package.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingBlock: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.smallText}>Arrives on</Text>
            <Text style={{ fontWeight: 500 }}>Tue, May 6</Text>
          </View>
          <View style={styles.dashedline} />
          <MaterialCommunityIcons name="van-utility" size={24} color="black" />
          <View style={styles.dashedline} />
          <View>
            <Text style={styles.smallText}>Delivered by</Text>
            <Text style={{ fontWeight: 500 }}>6:00 pm</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          // flexDirection: "row",
          gap: 10,
          // justifyContent: "space-between",
        }}
      >
        <Button
          title="Go back"
          textColor={appColors.text}
          bgColor={appColors.grey}
          fontSize={14}
          // height={55}
          // width={"48%"}
          onPress={() => setStep(1)}
        />

        <Button
          title="Confirm"
          textColor={appColors.text}
          bgColor={appColors.primary}
          fontSize={14}
          onPress={() => setOpen((prevOpen) => !prevOpen)}

          // height={55}
          // width={"48%"}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  smallText: { fontWeight: 300, marginBottom: 2, fontSize: 12 },
  midText: { fontSize: 13, fontWeight: 500 },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dashedline: {
    width: 50,
    height: 1,
    borderStyle: "dashed",
    borderTopWidth: 1,
    opacity: 0.2,
  },
})

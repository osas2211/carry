import { View, Text, StyleSheet, Animated } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"
import Foundation from "@expo/vector-icons/Foundation"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Button } from "../../ui/Button"
import { CreateShipmentFormI } from "./create-form-type"
import { haversineDistance } from "@/helpers/haversineDistance"
import moment from "moment"
import { calculateETA } from "@/helpers/CalculateETA"
import { useCreateDeliveryJob } from "@/hooks/api-hooks/useDeliveryJobs"
import { CreateDeliveryJobDto } from "@/@types/delivery_jobs"
import { LAMPORTS } from "@/constants/units"

export const ConfirmShipment = ({
  setStep,
  setForm,
  form,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setForm: React.Dispatch<React.SetStateAction<CreateShipmentFormI>>
  form: CreateShipmentFormI
}) => {
  const [open, setOpen] = React.useState(false)
  const distanceKm = haversineDistance(
    form.from?.geometry?.location.lat,
    form.from?.geometry?.location.lng,
    form.to?.geometry?.location.lat,
    form.to?.geometry?.location.lng
  )
  const { eta_date, eta_time } = calculateETA(distanceKm, 30)
  const reward = Number(distanceKm * 0.00409)
  const cost = reward.toPrecision(3)

  const createShipment = useCreateDeliveryJob()
  const handleConfirm = () => {
    const payload: CreateDeliveryJobDto = {
      reward: Number(cost) * LAMPORTS,
      pickupAddress: form.from?.formatted_address || "",
      dropoffAddress: form.to?.formatted_address || "",
      packageType: form.packageType,
      eta: eta_date,
      isFragile: form.isFragile,
    }
    createShipment.mutate(payload)
  }
  return (
    <Animated.View>
      <Text style={{ fontSize: 24, fontWeight: 600 }}>Confirm Shipment</Text>
      <Text style={{ fontWeight: 300 }}>Kindly review your shipment</Text>

      <View style={{ marginBlock: 17, gap: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 400 }}>Shipment Details</Text>
        <View
          style={{
            padding: 16,
            borderRadius: 10,
            minHeight: 100,
            backgroundColor: appColors.grey,
            gap: 12,
          }}
        >
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Pickup Location</Text>
            <Text style={styles.midText}>
              {form?.from?.formatted_address || "-"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Dropoff Location</Text>
            <Text style={styles.midText}>
              {form?.to?.formatted_address || "-"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Distance</Text>
            <Text
              style={{
                ...styles.midText,
                color: appColors.error,
              }}
            >
              {distanceKm.toFixed(2)} km
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>ETA</Text>
            <Text
              style={{
                ...styles.midText,
                color: appColors.error,
              }}
            >
              {eta_time}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Cost/Courier reward</Text>
            <Text
              style={{
                ...styles.midText,
                color: appColors.blue,
                fontWeight: 800,
              }}
            >
              {cost} SOL
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Package Type</Text>
            <Text style={styles.midText}>{form?.packageType || "-"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.smallText}>Fragile</Text>
            <Text style={styles.midText}>
              {form?.isFragile
                ? "Package is fragile"
                : "Package is not fragile"}
            </Text>
          </View>
          {/* <View style={styles.infoRow}>
            <Text style={styles.smallText}>Temperature Sensitive</Text>
            <Text style={styles.midText}>
              {form?.isTemperateSensitive
                ? "Temperature sensitive"
                : "Not temperature sensitive"}
            </Text>
          </View> */}
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
            <Text style={{ fontWeight: 500 }}>
              {moment(eta_date).format("LL")}
            </Text>
          </View>
          <View style={styles.dashedline} />
          <MaterialCommunityIcons name="van-utility" size={24} color="black" />
          <View style={styles.dashedline} />
          <View>
            <Text style={styles.smallText}>Delivered by</Text>
            <Text style={{ fontWeight: 500 }}>
              {moment(eta_date).format("LT")}
            </Text>
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
          disabled={createShipment.isPending}
        />

        <Button
          title="Confirm"
          textColor={appColors.text}
          bgColor={appColors.primary}
          fontSize={14}
          onPress={handleConfirm}
          disabled={createShipment.isPending}
          isLoading={createShipment.isPending}

          // height={55}
          // width={"48%"}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  smallText: { fontWeight: 300, marginBottom: 2, fontSize: 12 },
  midText: { fontSize: 12, fontWeight: 500, width: "60%", textAlign: "right" },
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

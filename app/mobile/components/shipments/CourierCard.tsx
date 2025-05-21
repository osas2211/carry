import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { UserProfile } from "@/@types/user"
import { Avatar } from "../ui/Avatar"
import { Button } from "../ui/Button"
import { appColors } from "@/constants/Colors"
import { DeliveryJobI } from "@/@types/delivery_jobs"
import {
  useAssignToCourier,
  useGetSingleShipment,
} from "@/hooks/api-hooks/useDeliveryJobs"
import { useLocalSearchParams } from "expo-router"
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification"
import { useDeliveryProgram } from "../program/program-data-access"

const CourierCard = ({
  courier,
  shipment,
  handleCloseModalPress,
}: {
  courier: UserProfile
  shipment: DeliveryJobI
  handleCloseModalPress: () => void
}) => {
  const { tracking_id } = useLocalSearchParams()
  const { refetch } = useGetSingleShipment(shipment.id as string)
  const mutation = useAssignToCourier()
  const { assignDelivery } = useDeliveryProgram();
  const handleAssign = async () => {
    const tx = await assignDelivery.mutateAsync({
      index: Number(shipment.programId),
      courier: courier.walletAddress
    })

    console.log(tx);

    await mutation.mutateAsync({
      id: shipment.id,
      courierAddress: courier.walletAddress,
    })
    await refetch()
    setTimeout(() => {
      handleCloseModalPress()
    }, 3000)
  }
  return (
    <AlertNotificationRoot>
      <View style={{ gap: 16 }}>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              gap: 7,
              alignItems: "center",
              width: "55%",
            }}
          >
            <Avatar src={courier.avatarUrl || ""} size={50} />
            <View>
              <Text style={{ fontWeight: 500 }}>{courier?.username}</Text>
              <Text style={{ fontWeight: 300, fontSize: 12 }}>5 Min away</Text>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: 500, textAlign: "right" }}>
              #{courier?.reputation?.score} Rank /
              <Text style={{ fontWeight: 300, fontSize: 12 }}> by area</Text>
            </Text>
            <Text style={{ fontWeight: 300, fontSize: 12, textAlign: "right" }}>
              {courier?.jobsCompleted} completed
            </Text>
          </View>
        </View>
        <Button
          title="Assign Courier"
          bgColor={appColors.primary_low}
          textColor={appColors.primary}
          isLoading={mutation.isPending}
          onPress={handleAssign}
        />
      </View>
    </AlertNotificationRoot>
  )
}

export default CourierCard

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

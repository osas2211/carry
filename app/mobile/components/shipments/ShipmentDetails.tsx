import { View, ActivityIndicator, StyleSheet } from "react-native"
import React, { useEffect } from "react"
import { ShipmentMetaInfo } from "./ShipmentMetaInfo"
import { Timeline } from "./Timeline"
import { useLocalSearchParams, usePathname } from "expo-router"
import {
  useGetSingleShipment,
  useGetUserShipments,
} from "@/hooks/api-hooks/useDeliveryJobs"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import AssignToCourier from "./AssignToCourier"
import { DeliveryJobI } from "@/@types/delivery_jobs"
import { socket } from "@/helpers/socket"
import { schedulePushNotification } from "@/helpers/schedule_push_notification"

export const ShipmentDetails = () => {
  const { tracking_id } = useLocalSearchParams()
  const { refetch: refetchAll } = useGetUserShipments()
  const { data, isLoading, refetch } = useGetSingleShipment(
    tracking_id as string
  )

  useEffect(() => {
    const eventName = `shipment-status-${tracking_id}`

    const handleStatusUpdate = (data: { status: string }) => {
      refetch()
      refetchAll()
      schedulePushNotification({
        title: "Shipment status",
        body: `Your Shipment has been ${data?.status}`,
      })
    }

    socket.on(eventName, handleStatusUpdate)

    return () => {
      socket.off(eventName, handleStatusUpdate) // Clean up the listener
    }
  }, [tracking_id]) // Only re-run when tracking_id changes

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ gap: 10, paddingInline: 16, paddingBottom: 0 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <ShipmentMetaInfo
              {...{
                tracking_id: data?.id,
                item_name: data?.packageType as string,
                from_place: data?.pickupAddress,
                to_place: data?.dropoffAddress,
                status: data?.status,
                shipment: data,
              }}
            />
            <Timeline shipment={data!!} />
          </>
        )}
      </View>
      {data && <AssignToCourier shipment={data as DeliveryJobI} />}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

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

export const ShipmentDetails = () => {
  const { tracking_id } = useLocalSearchParams()
  const { refetch: refetchAll } = useGetUserShipments()
  const { data, isLoading, refetch } = useGetSingleShipment(
    tracking_id as string
  )

  useEffect(() => {
    socket.on(`shipment-status-${tracking_id}`, (data) => {
      refetch()
      refetchAll()
    })
  })

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

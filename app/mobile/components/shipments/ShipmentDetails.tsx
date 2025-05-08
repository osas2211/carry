import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ShipmentMetaInfo } from "./ShipmentMetaInfo"
import { Timeline } from "./Timeline"
import { useLocalSearchParams, usePathname } from "expo-router"
import { useGetSingleShipment } from "@/hooks/api-hooks/useDeliveryJobs"
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { appColors } from "@/constants/Colors"
import { Button } from "../ui/Button"
import AssignToCourier from "./AssignToCourier"
import shipments from "@/app/(tabs)/shipments"
import { DeliveryJobI } from "@/@types/delivery_jobs"

export const ShipmentDetails = () => {
  const { tracking_id } = useLocalSearchParams()
  const pathname = usePathname()
  const { data, isLoading } = useGetSingleShipment(tracking_id as string)

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

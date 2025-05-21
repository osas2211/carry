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
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler"
import { appColors } from "@/constants/Colors"
import { Button } from "../ui/Button"
import shipments from "@/app/(tabs)/shipments"
import { DeliveryJobI } from "@/@types/delivery_jobs"
import { useGetCouriers } from "@/hooks/api-hooks/useUser"
import CourierCard from "./CourierCard"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"

const AssignToCourier = ({ shipment }: { shipment: DeliveryJobI }) => {
  const pathname = usePathname()
  const { data: couriers, isLoading } = useGetCouriers()
  const snapPoints = useMemo(() => ["80%"], [])

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index)
  }, [])

  useEffect(() => {
    if (!shipment?.courierAddress) {
      handlePresentModalPress()
    } else {
      // handleCloseModalPress()
    }
  }, [shipment.courierAddress, pathname])
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1.2,
              borderBottomColor: "#DEE2E6",
              paddingBottom: 14,
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 20 }}>
              Assign Courier
            </Text>
            <Text style={{ fontWeight: 300 }}>Close to you</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 20 }}>
                {couriers?.map((courier, index) => {
                  return (
                    <CourierCard
                      key={index}
                      courier={courier}
                      shipment={shipment}
                      handleCloseModalPress={handleCloseModalPress}
                    />
                  )
                })}
              </View>
            </ScrollView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    // alignItems: "center",
    elevation: 1,
    backgroundColor: appColors.background,
    gap: 14,
  },
})

export default AssignToCourier

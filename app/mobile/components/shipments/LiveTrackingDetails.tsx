import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "expo-router"
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { ScrollView } from "react-native-gesture-handler"
import { appColors } from "@/constants/Colors"
import { DeliveryJobI } from "@/@types/delivery_jobs"
import { Avatar, IconAvatar } from "../ui/Avatar"
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons"
import { LAMPORTS } from "@/constants/units"
import { Button } from "../ui/Button"

const LiveTrackingDetails = ({ shipment }: { shipment: DeliveryJobI }) => {
  const pathname = usePathname()
  const snapPoints = useMemo(() => ["10%", "20%", "87%"], [])

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
    handlePresentModalPress()
  }, [])
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        // enableDynamicSizing={true}
        enablePanDownToClose={false}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#DEE2E6",
              padding: 16,
              paddingTop: 10,
              paddingBottom: 14,
            }}
          >
            <View>
              <Text style={{ fontWeight: 600, fontSize: 20 }}>
                Courier is arriving in
              </Text>
              <Text style={{ fontWeight: 600, fontSize: 20 }}>~6 mins</Text>
              <Text>Blue Toyota Van</Text>
            </View>
            <Image
              source={require("../../assets/images/courier/courier_bus.png")}
              style={{
                height: 80,
                width: 150,
                objectFit: "cover",
                marginTop: -15,
                marginRight: -30,
              }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                gap: 10,
                padding: 16,
                paddingBlock: 20,
                flexDirection: "row",
                justifyContent: "space-around",
                borderBottomWidth: 1,
                borderBottomColor: "#DEE2E6",
              }}
            >
              <View style={{ alignItems: "center", gap: 10 }}>
                <View style={{ position: "relative" }}>
                  <Avatar
                    src={shipment?.courier?.avatarUrl || ""}
                    size={58}
                    withBorder
                    borderColor={appColors.blue}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 5,
                      right: -30,
                      backgroundColor: "#fff",
                      padding: 2,
                      paddingInline: 5,
                      borderRadius: 10,
                      elevation: 3,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center",
                      }}
                    >
                      <AntDesign
                        name="star"
                        size={10}
                        color={appColors.pending}
                      />
                      <Text style={{ fontSize: 10, fontWeight: 600 }}>
                        {Number(shipment.courier?.reputationScore || 0).toFixed(
                          2
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: -5,
                      right: -0,
                    }}
                  >
                    <IconAvatar
                      size={20}
                      icon={
                        <Ionicons
                          name="diamond"
                          size={14}
                          color={appColors.blue}
                        />
                      }
                    />
                  </View>
                </View>
                <Text style={{ fontWeight: 500 }}>
                  {shipment?.courier?.username}
                </Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <IconAvatar
                  size={58}
                  bgColor={appColors.success}
                  icon={<AntDesign name="message1" size={24} color="black" />}
                />
                <Text style={{ fontWeight: 500 }}>Contact driver</Text>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <IconAvatar
                  size={58}
                  bgColor={appColors.success}
                  icon={
                    <MaterialIcons name="security" size={24} color="black" />
                  }
                />
                <Text style={{ fontWeight: 500 }}>Safety</Text>
              </View>
            </View>
            <View style={{ padding: 16, gap: 18 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: "100%",
                  padding: 16,
                  backgroundColor: appColors.grey,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <AntDesign name="message1" size={24} color={"black"} />
                  <Text style={{ fontSize: 16 }}>
                    Any pickup notes for courier?
                  </Text>
                </View>
                <Entypo name="chevron-thin-right" size={20} color="black" />
              </TouchableOpacity>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: 500, opacity: 0.6 }}>
                  Courier Reward
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    forSource
                    src={require("../../assets/images/solona.png")}
                    size={25}
                  />
                  <Text style={{ fontWeight: 500, fontSize: 18 }}>
                    {Number(shipment.reward) / LAMPORTS}{" "}
                    <Text style={{ fontSize: 12 }}>SOL</Text>
                  </Text>
                </View>
              </View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: 500, opacity: 0.6 }}>
                  Your Destinations
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <IconAvatar
                    icon={
                      <MaterialIcons
                        name="my-location"
                        size={25}
                        color={appColors.pending}
                      />
                    }
                    size={25}
                  />
                  <Text style={{ fontWeight: 500, fontSize: 15, width: "90%" }}>
                    {shipment.pickupAddress}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <IconAvatar
                    icon={
                      <MaterialIcons
                        name="my-location"
                        size={25}
                        color={appColors.error}
                      />
                    }
                    size={25}
                  />
                  <Text style={{ fontWeight: 500, fontSize: 15, width: "90%" }}>
                    {shipment.dropoffAddress}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: "100%",
                  paddingBlock: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <AntDesign name="sharealt" size={24} color={"black"} />
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    Share my shipment
                  </Text>
                </View>
                <Entypo name="chevron-thin-right" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <MaterialCommunityIcons
                    name="car-emergency"
                    size={24}
                    color={appColors.error}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: appColors.error,
                    }}
                  >
                    Call emergency
                  </Text>
                </View>
                <Entypo name="chevron-thin-right" size={20} color="black" />
              </TouchableOpacity>
              <Button
                title="Cancel shipment"
                bgColor={appColors.grey}
                textColor={appColors.error}
              />
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // padding: 16,
    // alignItems: "center",
    elevation: 1,
    backgroundColor: appColors.background,
    // gap: 14,
  },
  container: {
    flex: 1,
  },
})

export default LiveTrackingDetails

import { View, Text } from "react-native"
import React from "react"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Status } from "../ui/Status"
import { appColors } from "@/constants/Colors"
import moment from "moment"
import { Map } from "../ui/Map"
import { Button } from "../ui/Button"
import Entypo from "@expo/vector-icons/Entypo"
import { router } from "expo-router"
import { JobStatus } from "@/@types/delivery_jobs"
import { truncateText } from "@/helpers/trunctateText"

export const ShipmentMetaInfo = ({
  item_name = "",
  tracking_id = 0 || "",
  from_place = "",
  to_place = "",
  status = JobStatus.ACTIVE,
}) => {
  const formatted_status =
    status === JobStatus.ACTIVE
      ? "pending"
      : status === JobStatus.ASSIGNED
      ? "assigned"
      : status === JobStatus.CANCELLED
      ? "cancelled"
      : status === JobStatus.DELIVERED
      ? "completed"
      : status === JobStatus.IN_PROGRESS
      ? "waiting for pickup"
      : "in-transit"

  return (
    <View>
      <View
        style={{
          backgroundColor: appColors.background,
          // elevation: 1,
          shadowColor: "#444447",
          gap: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center", gap: 12, flexDirection: "row" }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: "#C6C5B9",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="package-variant"
                size={24}
                color={"#393D3F"}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>{item_name}</Text>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>
                Tracking ID: {truncateText(tracking_id, 7)}
              </Text>
            </View>
          </View>
          <Status status={formatted_status} />
        </View>

        <View style={{ position: "relative" }}>
          <Map />
          <View style={{ position: "absolute", bottom: 10, left: 10 }}>
            <Button
              title="Track Live"
              height={36}
              width={120}
              bgColor={appColors.primary}
              textColor={appColors.text}
              fontSize={14}
              icon={<Entypo name="location" size={16} color="black" />}
              onPress={() => router.push(`/shipment/${tracking_id}/tracking`)}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

import { appColors } from "@/constants/Colors"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { ColorValue, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { Status } from "../ui/Status"
import { truncateText } from "@/helpers/trunctateText"
import { JobStatus } from "@/@types/delivery_jobs"

export const ShipmentSummaryCard = ({
  item_name = "",
  tracking_id = 0 || "",
  from_place = "",
  to_place = "",
  status = JobStatus.ACTIVE,
  lineHeight = 50,
  withBlueBg = false,
}) => {
  const formatted_status =
    status === JobStatus.ACTIVE
      ? "pending"
      : status === JobStatus.CANCELLED
      ? "cancelled"
      : status === JobStatus.DELIVERED
      ? "completed"
      : "in-transit"
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push(`/shipment/${tracking_id}`)}
      style={{ position: "relative" }}
    >
      <View
        style={{
          backgroundColor: withBlueBg ? appColors.blue : appColors.background,
          // elevation: 1,
          shadowColor: "#444447",
          padding: 16,
          borderRadius: 10,
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
                backgroundColor: withBlueBg ? "#fff" : "#C6C5B9",
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                {item_name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                Tracking ID: {truncateText(tracking_id, 8)}
              </Text>
            </View>
          </View>
          <Status status={formatted_status} />
        </View>

        <View style={{ flexDirection: "row", gap: 0 }}>
          <View style={{ alignItems: "center", gap: 5, width: 40 }}>
            <Ionicons name="location" size={24} color={appColors.primary} />
            <View
              style={{
                height: lineHeight,
                width: 1,
                borderRightWidth: 1,
                borderStyle: "dashed",
                borderColor: withBlueBg ? "#fff" : "#5465FF",
              }}
            />
            <Ionicons name="location" size={24} color={appColors.success} />
          </View>
          <View style={{ justifyContent: "space-between", width: "100%" }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                From:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  width: "75%",
                  fontWeight: 500,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                {from_place}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                To:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  width: "75%",
                  fontWeight: 500,
                  color: withBlueBg ? appColors.background : appColors.text,
                }}
              >
                {to_place}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            textDecorationLine: "underline",
            fontSize: 12,
            paddingLeft: 10,
            color: withBlueBg ? appColors.background : appColors.text,
          }}
        >
          View details
        </Text>
      </View>
      {withBlueBg && (
        <View
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            width: "100%",
            height: "100%",
            backgroundColor: appColors.text,
            borderRadius: 10,
            zIndex: -1,
          }}
        ></View>
      )}
    </TouchableOpacity>
  )
}

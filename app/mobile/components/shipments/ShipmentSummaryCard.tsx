import { appColors } from "@/constants/Colors"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, router } from "expo-router"
import { ColorValue, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { Status } from "../ui/Status"

export const ShipmentSummaryCard = ({
  item_name = "",
  tracking_id = 0,
  from_place = "",
  to_place = "",
  status = "pending" as
    | "pending"
    | "in-transit"
    | "completed"
    | "cancelled"
    | "failed",
  lineHeight = 50,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push(`/shipment/${tracking_id}`)}
    >
      <View
        style={{
          backgroundColor: appColors.background,
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
                Tracking ID: {tracking_id}
              </Text>
            </View>
          </View>
          <Status status={status} />
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
                borderColor: "#5465FF",
              }}
            />
            <Ionicons name="location" size={24} color={appColors.primary} />
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>From:</Text>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>
                {from_place}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 300 }}>To:</Text>
              <Text style={{ fontSize: 14, fontWeight: 500 }}>{to_place}</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            textDecorationLine: "underline",
            fontSize: 12,
            paddingLeft: 10,
          }}
        >
          View details
        </Text>
      </View>
    </TouchableOpacity>
  )
}

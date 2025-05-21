import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"
import { truncateText } from "@/helpers/trunctateText"
import moment from "moment"
import { Status } from "@/components/ui/Status"
import { JobStatus } from "@/@types/delivery_jobs"

const TrackingHistory = () => {
  const { data } = useGetUserShipments()
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.rowView}>
        <Text style={styles.boldText}>History</Text>
        <Link href={"/"}>
          <Text style={{ fontSize: 12 }}>See all</Text>
        </Link>
      </View>

      <View style={{ gap: 20 }}>
        {data?.data?.slice(0, 5).map((shipment, index) => {
          const formatted_status =
            shipment?.status === JobStatus.ACTIVE
              ? "pending"
              : shipment?.status === JobStatus.CANCELLED
              ? "cancelled"
              : shipment?.status === JobStatus.DELIVERED
              ? "completed"
              : "in-transit"
          return (
            <View key={index} style={{ gap: 3 }}>
              <View style={styles.rowView}>
                <Text style={{ ...styles.boldText, fontSize: 12 }}>
                  {shipment.packageType} Package
                </Text>
                <Status status={formatted_status} />
              </View>
              <View style={styles.rowView}>
                <Text style={{ ...styles.smallText, fontSize: 10 }}>
                  {moment(shipment.createdAt).format("LL LT")}
                </Text>
                <Link href={`/shipment/${shipment.id}`}>
                  <Text
                    style={{
                      // color: appColors.primary,
                      ...styles.smallText,
                      textDecorationLine: "underline",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    Track shipment
                  </Text>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },
  smallText: {
    fontSize: 11,
    fontFamily: "MontserratRegular",
  },
})

export default TrackingHistory

import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { DeliveryJobI, JobStatus } from "@/@types/delivery_jobs"
import { Status } from "@/components/ui/Status"
import moment from "moment"
import { Link } from "expo-router"
import { appColors } from "@/constants/Colors"

const ShipmentCard = ({ shipment }: { shipment: DeliveryJobI }) => {
  const formatted_status =
    shipment.status === JobStatus.ACTIVE
      ? "pending"
      : shipment.status === JobStatus.ASSIGNED
      ? "assigned"
      : shipment.status === JobStatus.CANCELLED
      ? "cancelled"
      : shipment.status === JobStatus.DELIVERED
      ? "completed"
      : shipment.status === JobStatus.IN_PROGRESS
      ? "awaiting pickup"
      : "in-transit"
  const code = String(Math.random())

  return (
    <Link href={`/shipment/${shipment.id}`} style={{ width: "100%" }}>
      <View style={{ gap: 5, width: "100%" }}>
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
        {shipment.status !== JobStatus.DELIVERED &&
          shipment.status !== JobStatus.CANCELLED && (
            <>
              <View style={{ ...styles.rowView, marginBlock: 5 }}>
                <Text
                  style={{ ...styles.boldText, fontSize: 12, width: "40%" }}
                >
                  Share this code with the courier
                </Text>
                <View style={{ ...styles.rowView }}>
                  {code
                    .split("")
                    .slice(2, 6)
                    .map((letter, index) => {
                      return (
                        <Text key={index} style={styles.code_style}>
                          {letter}
                        </Text>
                      )
                    })}
                </View>
              </View>
              <View style={styles.rowView}>
                <View
                  style={{
                    height: 5,
                    width: "23%",
                    backgroundColor: "#3DA35D",
                    borderRadius: 5,
                  }}
                />
                <View
                  style={{
                    height: 5,
                    width: "23%",
                    backgroundColor:
                      shipment.status === JobStatus.ASSIGNED ||
                      shipment.status === JobStatus.IN_PROGRESS
                        ? "#3DA35D"
                        : appColors.grey,
                    borderRadius: 5,
                  }}
                />
                <View
                  style={{
                    height: 5,
                    width: "23%",
                    backgroundColor:
                      shipment.status === JobStatus.PICKED_UP
                        ? "#3DA35D"
                        : appColors.grey,
                    borderRadius: 5,
                  }}
                />
                <View
                  style={{
                    height: 5,
                    width: "23%",
                    backgroundColor: appColors.grey,
                    borderRadius: 5,
                  }}
                />
              </View>
              <View>
                <Text style={{ ...styles.smallText, fontSize: 10 }}>
                  ETA: {moment(shipment.eta).format("LL, LT")}
                </Text>
              </View>
            </>
          )}
      </View>
    </Link>
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
  code_style: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    backgroundColor: appColors.grey,
    paddingInline: 13,
    paddingBlock: 7,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
})

export default ShipmentCard

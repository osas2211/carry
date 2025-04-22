import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { appColors } from "@/constants/Colors"
import moment from "moment"
import { Button } from "../ui/Button"
import { ContactDeliveryPerson } from "./ContactDeliveryPerson"

export const Timeline = ({
  from_place = "",
  to_place = "",
  status = "pending" as
    | "pending"
    | "in-transit"
    | "completed"
    | "cancelled"
    | "failed",
}) => {
  const [step, setStep] = useState(1)
  useEffect(() => {
    if (status === "in-transit") {
      setStep(2)
    }
    if (status === "completed") {
      setStep(3)
    }
  }, [status])
  return (
    <View>
      <View
        style={{
          marginBlock: 10,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            paddingLeft: 10,
          }}
        >
          Timeline
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text
            style={{
              fontWeight: 300,
              textDecorationLine: "underline",
              color: appColors.blue,
            }}
          >
            View receipient details
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: 0, marginBottom: 10 }}>
        <View style={{ alignItems: "center", gap: 5, width: 40 }}>
          <Ionicons name="location" size={24} color={appColors.primary} />
          <View style={styles.dashed_line} />
          <Ionicons name="location" size={24} color={appColors.primary} />
          <View style={styles.dashed_line} />
          <Ionicons
            name="location"
            size={24}
            color={step === 2 ? appColors.primary : "#CCCCCC"}
          />
          <View style={styles.dashed_line} />
          <Ionicons
            name="location"
            size={24}
            color={step === 3 ? appColors.primary : "#CCCCCC"}
          />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <TimelineDetails status="From:" time="" description={from_place} />
          <TimelineDetails
            status="Pending"
            time=""
            description={"Waiting for pickup"}
          />
          <TimelineDetails
            status="In Transit"
            time=""
            description={"Package has been picked up"}
          />
          <TimelineDetails status="Delivered" time="" description={to_place} />
        </View>
      </View>
      {/* <Button title="Track Live" /> */}
      <ContactDeliveryPerson />
    </View>
  )
}

const styles = StyleSheet.create({
  dashed_line: {
    minHeight: 49,
    width: 1,
    borderRightWidth: 1,
    borderStyle: "dashed",
    borderColor: "#5465FF",
  },
})

const TimelineDetails = ({ time = "", description = "", status = "" }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "93%",
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 300 }}>{status}</Text>
        <Text style={{ fontSize: 12, fontWeight: 300 }}>
          {moment().format("LL")}
        </Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: 500 }}>{description}</Text>
      <Text style={{ fontSize: 12, fontWeight: 300 }}>
        {moment().format("LT")}
      </Text>
    </View>
  )
}

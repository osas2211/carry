import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { UserProfile } from "@/@types/user"
import { Avatar } from "../ui/Avatar"
import { Button } from "../ui/Button"
import { appColors } from "@/constants/Colors"

const CourierCard = ({ courier }: { courier: UserProfile }) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 7,
            alignItems: "center",
            width: "55%",
          }}
        >
          <Avatar src={courier.avatarUrl || ""} size={50} />
          <View>
            <Text style={{ fontWeight: 500 }}>{courier?.username}</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>5 Min away</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: 500, textAlign: "right" }}>
            #{courier?.reputation?.score} Rank /
            <Text style={{ fontWeight: 300, fontSize: 12 }}> by area</Text>
          </Text>
          <Text style={{ fontWeight: 300, fontSize: 12, textAlign: "right" }}>
            {courier?.jobsCompleted} completed
          </Text>
        </View>
      </View>
      <Button
        title="Assign Courier"
        bgColor={appColors.primary}
        textColor={appColors.text}
      />
    </View>
  )
}

export default CourierCard

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

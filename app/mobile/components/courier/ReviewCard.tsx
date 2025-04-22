import React from "react"
import { Text, View } from "react-native"
import { Avatar } from "../ui/Avatar"
import { FontAwesome } from "@expo/vector-icons"
import { appColors } from "@/constants/Colors"
import moment from "moment"

type props = {
  img_url: string
  user_name: string
  rating: number
  review: string
  createdAt: string
}

export const ReviewCard = ({
  img_url,
  user_name,
  rating,
  review,
  createdAt,
}: props) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <Avatar src={img_url} />
      <View style={{ gap: 5 }}>
        <Text>{user_name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <FontAwesome name="star" size={20} color={appColors.pending} />
            <Text style={{ fontSize: 12, fontWeight: 300 }}>{rating}</Text>
          </View>
          <Text style={{ fontSize: 12 }}>{moment(createdAt).fromNow()}</Text>
        </View>
        <Text style={{ maxWidth: "93%", fontWeight: 300, lineHeight: 18 }}>
          {review}
        </Text>
      </View>
    </View>
  )
}

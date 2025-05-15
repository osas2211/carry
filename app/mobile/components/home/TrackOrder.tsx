import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native"
import React, { useState } from "react"
import { appColors } from "@/constants/Colors"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Button } from "../ui/Button"
import { Avatar, AvatarWithStatus } from "../ui/Avatar"
import { router } from "expo-router"
import { useGetUser } from "@/hooks/api-hooks/useUser"
import { truncateText } from "@/helpers/trunctateText"
import HomeHeader from "./Header"

export const TrackOrder = () => {
  const [tracking_id, setTracking_id] = useState("")

  const { data: user, isLoading } = useGetUser()
  return (
    <View
      style={{
        gap: 20,
        backgroundColor: appColors.primary,
        paddingTop: 40,
        paddingInline: 14,
        paddingBottom: 30,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
      }}
    >
      <HomeHeader />
      <View
        style={{
          minHeight: 180,
          // backgroundColor: appColors.text,
          borderRadius: 15,
          // padding: 16,
          gap: 30,
        }}
      >
        <View>
          <Text
            style={{
              color: appColors.background,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            Track your Package now.
          </Text>
          <Text
            style={{
              color: appColors.background,
              fontSize: 14,
              fontWeight: 300,
              marginTop: 5,
              maxWidth: 300,
            }}
          >
            Please enter your tracking number below to continue.
          </Text>
        </View>

        <View style={{ gap: 10 }}>
          <View style={{ position: "relative" }}>
            <TextInput
              style={{
                backgroundColor: appColors.background,
                borderRadius: 5,
                paddingLeft: 30,
                height: 40,
              }}
              placeholder="Tracking number"
              onChangeText={(value) => setTracking_id(value)}
              value={tracking_id}
            />
            <View style={{ position: "absolute", top: 8, left: 5 }}>
              <Ionicons
                name="search"
                size={24}
                color="black"
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>

          <Button
            title="Track Package"
            height={40}
            // bgColor={appColors.primary}
            // textColor={appColors.text}
            borderRadius={5}
            onPress={() => {
              if (tracking_id.length > 2) {
                router.push(`/shipment/${tracking_id}/tracking`)
                setTracking_id("")
              }
            }}
          />
        </View>
      </View>
    </View>
  )
}

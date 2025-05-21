import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native"
import React from "react"
import { useGetUser } from "@/hooks/api-hooks/useUser"
import { AvatarWithStatus } from "../ui/Avatar"
import { truncateText } from "@/helpers/trunctateText"
import { appColors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const HomeHeader = () => {
  const { data: user, isLoading, refetch, error } = useGetUser()

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 50,
          padding: 5,
          paddingRight: 20,
          borderRadius: 25,
          alignItems: "center",
          flexDirection: "row",
          gap: 8,
          borderColor: appColors.text,

          backgroundColor: "#343434",
        }}
      >
        {isLoading ? (
          <>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                paddingInline: 5,
              }}
            >
              <ActivityIndicator />
            </View>
            <View>
              <Text style={{ color: appColors.background }}>Loading...</Text>
              <Text style={{ fontSize: 12 }}>loading...</Text>
            </View>
          </>
        ) : (
          <>
            <AvatarWithStatus
              elevation={15}
              status="online"
              src={user?.avatarUrl || ""}
            />
            <View>
              <Text style={{ color: appColors.background }}>
                {user?.username}
              </Text>
              <Text style={{ fontSize: 11, color: appColors.background }}>
                {truncateText(user?.walletAddress || "", 5)}
              </Text>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: "#343434",
          height: 45,
          width: 45,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
        }}
      >
        <Ionicons name="notifications" size={24} color={appColors.primary} />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

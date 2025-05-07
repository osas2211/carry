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
  const { data: user, isLoading, refetch } = useGetUser()

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
          // borderWidth: 0.2,
          // elevation: 2,
          backgroundColor: "#fff",
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
              <Text style={{ fontFamily: "RobotoMedium" }}>Loading...</Text>
              <Text style={{ fontSize: 12 }}>loading...</Text>
            </View>
          </>
        ) : (
          <>
            <AvatarWithStatus status="online" src={user?.avatarUrl || ""} />
            <View>
              <Text style={{ fontFamily: "RobotoMedium" }}>
                {user?.username}
              </Text>
              <Text style={{ fontSize: 11 }}>
                {truncateText(user?.walletAddress || "", 5)}
              </Text>
            </View>
            <Pressable onPress={() => refetch()}>
              <Text>Click me</Text>
            </Pressable>
          </>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: appColors.primary,
          height: 45,
          width: 45,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
        }}
      >
        <Ionicons name="notifications" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

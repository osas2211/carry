import { ScrollView, View } from "react-native"
import NormalUserHome from "@/components/home/NormalUserHome"
import { getItem } from "expo-secure-store"
import { USER_PUBLIC_KEY, USER_ROLE } from "@/constants/key_strings"
import { UserRole } from "@/@types/user"
import CourierHome from "@/components/home/CourierHome"
import { useGetUserShipments } from "@/hooks/api-hooks/useDeliveryJobs"
import { useEffect } from "react"
import { socket } from "@/helpers/socket"
import NormalUserUI from "@/components/home/user-ui/NormalUserUI"

export default function HomeScreen() {
  const role = getItem(USER_ROLE) as UserRole.COURIER | UserRole.NORMAL_USER
  const { refetch: refetchAllShipments } = useGetUserShipments()
  const walletAddress = getItem(USER_PUBLIC_KEY)

  useEffect(() => {
    socket.on(`courier-${walletAddress}`, (data) => {
      refetchAllShipments()
      console.log(data)
    })
  })

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            minHeight: 300,
            // backgroundColor: appColors.primary,

            gap: 20,
          }}
        >
          {role === UserRole.NORMAL_USER ? <NormalUserUI /> : <CourierHome />}
        </View>
      </ScrollView>
    </>
  )
}

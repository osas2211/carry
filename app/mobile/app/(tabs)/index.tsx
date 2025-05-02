import { ScrollView, View } from "react-native"
import NormalUserHome from "@/components/home/NormalUserHome"
import { getItem } from "expo-secure-store"
import { USER_ROLE } from "@/constants/key_strings"
import { UserRole } from "@/@types/user"
import CourierHome from "@/components/home/CourierHome"

export default function HomeScreen() {
  const role = getItem(USER_ROLE) as UserRole.COURIER | UserRole.NORMAL_USER
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            minHeight: 300,
            // backgroundColor: appColors.primary,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            paddingBlock: 20,
            paddingTop: 20,
            paddingInline: 16,
            gap: 20,
          }}
        >
          {role === UserRole.NORMAL_USER ? <NormalUserHome /> : <CourierHome />}
        </View>
      </ScrollView>
    </>
  )
}

import { ScrollView, View } from "react-native"
import { TrackOrder } from "@/components/home/TrackOrder"
import { TrackingHistory } from "@/components/home/TrackingHistory"
import { CurrentShipment } from "@/components/home/CurrentShipment"
import { SafeAreaView } from "react-native-safe-area-context"
import { Links } from "@/components/home/Links"

export default function HomeScreen() {
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
          <TrackOrder />
          {/* <Links /> */}
          <TrackingHistory />
          <CurrentShipment />
        </View>
      </ScrollView>
    </>
  )
}

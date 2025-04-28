import { View, Text, StyleSheet } from "react-native"
import React from "react"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { appColors } from "@/constants/Colors"
import { ReviewCard } from "./ReviewCard"

export const AboutCourier = () => {
  return (
    <View style={{ marginBlock: 10, gap: 20 }}>
      <View>
        <Text style={styles.section_title}>About</Text>
        <Text style={styles.faint_text}>
          Johnson Alexandre offers fast, reliable help with all your pickup and
          moving needs with ease and efficiency, ensuring a seemless experience.
        </Text>
      </View>
      <View style={styles.shipmet_style}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: 600, fontSize: 12 }}>Total Shipments</Text>
          <View style={{ gap: 2, flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="shipping-fast"
              size={14}
              color={appColors.blue}
            />
            <Text style={{ fontSize: 16 }}>150</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: 600, fontSize: 12 }}>Successful</Text>
            <View
              style={{ gap: 2, flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome5
                name="shipping-fast"
                size={14}
                color={appColors.primary}
              />
              <Text style={{ fontSize: 16 }}>125</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 2 }}>
            <Text style={{ fontWeight: 600, fontSize: 12 }}>
              Failed/Cancelled
            </Text>
            <View
              style={{ gap: 2, flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome5
                name="shipping-fast"
                size={14}
                color={appColors.error}
              />
              <Text style={{ fontSize: 16 }}>25</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.section_title}>Reviews</Text>
        <View style={{ gap: 10 }}>
          <ReviewCard
            img_url="https://randomuser.me/api/portraits/men/15.jpg"
            rating={4.5}
            review="Had a seemless experience, service was top-notch and on time. "
            user_name="Dele Alli"
            createdAt="2025-04-14T10:15:00Z"
          />
          <ReviewCard
            img_url="https://randomuser.me/api/portraits/men/5.jpg"
            rating={4.5}
            review="Had a seemless experience, service was top-notch and on time. "
            user_name="Dele Alli"
            createdAt="2025-04-14T10:15:00Z"
          />

          <ReviewCard
            img_url="https://randomuser.me/api/portraits/men/21.jpg"
            rating={4.5}
            review="Had a seemless experience, service was top-notch and on time. "
            user_name="Dele Alli"
            createdAt="2025-04-14T10:15:00Z"
          />

          <ReviewCard
            img_url="https://randomuser.me/api/portraits/men/41.jpg"
            rating={4.5}
            review="Had a seemless experience, service was top-notch and on time. "
            user_name="Dele Alli"
            createdAt="2025-04-14T10:15:00Z"
          />
          <ReviewCard
            img_url="https://randomuser.me/api/portraits/men/31.jpg"
            rating={4.5}
            review="Had a seemless experience, service was top-notch and on time. "
            user_name="Dele Alli"
            createdAt="2025-04-14T10:15:00Z"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section_title: {
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  shipmet_style: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: appColors.grey,
    padding: 14,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  faint_text: { fontWeight: 300, lineHeight: 20, maxWidth: 350 },
})

import { View, Text, Image } from "react-native"
import React from "react"
import { FontAwesome } from "@expo/vector-icons"

const CurrentShipment = () => {
  return (
    <View>
      {/* <Text
        style={{
          fontSize: 12,
          marginBottom: 5,
          fontFamily: "MontserratMedium",
        }}
      >
        Current shipment
      </Text> */}

      <View
        style={{
          height: 65,
          width: "100%",
          backgroundColor: "#ff0f7b10",
          borderRadius: 10,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <FontAwesome name="asterisk" size={20} color="#9667E0" />
          <View>
            {/* <Text style={{ fontSize: 10 }}>Current shipment</Text> */}
            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 12.5,
              }}
            >
              Shipment is awaiting pickup
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: "#9667E0",
                fontWeight: 500,
                textDecorationLine: "underline",
                fontFamily: "MontserratMedium",
              }}
            >
              Track this shipment
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require("../../../assets/images/home/delivery.png")}
            style={{ height: 80, width: 80, marginTop: 15 }}
          />
        </View>
      </View>
    </View>
  )
}

export default CurrentShipment

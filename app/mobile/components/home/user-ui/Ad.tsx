import { View, Text, Image } from "react-native"
import React from "react"

const Ad = () => {
  return (
    <View
      style={{
        height: 80,
        width: "100%",
        backgroundColor: "#F2EBFB",
        borderRadius: 10,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ fontSize: 10, fontFamily: "MontserratRegular" }}>
          P2P
        </Text>

        <Text
          style={{
            fontSize: 17,
            textTransform: "uppercase",
            fontWeight: 500,
            marginTop: -2,
            marginBottom: -2,
            fontFamily: "MontserratSemiBold",
          }}
        >
          delivery network.
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "MontserratMedium",
            paddingBlock: 2,
            borderRadius: 5,
            color: "#9667E0",
            fontWeight: 500,
            marginTop: -3,
          }}
        >
          built on the Solana Blockchain.
        </Text>
      </View>
      <View>
        <Image
          source={require("../../../assets/images/home/cash-delivery-concept.png")}
          style={{ height: 70, width: 90 }}
        />
      </View>
    </View>
  )
}

export default Ad

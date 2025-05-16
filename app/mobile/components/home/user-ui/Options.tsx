import { View, Text, Image } from "react-native"
import React from "react"
import { appColors } from "@/constants/Colors"

const options = [
  {
    bgColor: "#E8FCCF",
    icon: require("../../../assets/images/home/package.png"),
    title: "Send packages",
  },
  {
    bgColor: "#FAE0E4",
    icon: require("../../../assets/images/home/resturant.png"),
    title: "Restaurants",
  },
  {
    bgColor: "#E2EAFC",
    icon: require("../../../assets/images/home/market.png"),
    title: "Local markets",
  },
  {
    bgColor: "#F2EBFB",
    icon: require("../../../assets/images/home/phamarcy.png"),
    title: "Phamarcy",
  },
  {
    bgColor: "#FFFAE5",
    icon: require("../../../assets/images/home/shopping.png"),
    title: "Supermarket",
  },

  {
    bgColor: appColors.grey,
    icon: require("../../../assets/images/home/passport.png"),
    title: "Pickup someone",
  },
]

const Options = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {options.map((option, index) => {
        return (
          <View
            key={index}
            style={{
              height: 90,
              width: "31.5%",
              backgroundColor: option.bgColor,
              borderRadius: 10,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: 5,
            }}
          >
            <Image source={option.icon} style={{ height: 35, width: 35 }} />
            <Text
              style={{
                fontSize: 11,
                fontWeight: 400,
                fontFamily: "MontserratMedium",
              }}
            >
              {option.title}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

export default Options

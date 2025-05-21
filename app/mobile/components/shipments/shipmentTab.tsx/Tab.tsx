import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import React, { ReactNode, useEffect, useState } from "react"
import { appColors } from "@/constants/Colors"

type DataType = Record<string, any>

const Tab = ({ data }: { data: DataType }) => {
  const keys = Object.keys(data)
  const [active, setActive] = useState(keys[0])
  const itemWidth = 100 / keys.length
  useEffect(() => {
    setActive(keys[0])
  }, [])
  return (
    <View style={{ gap: 15 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // gap: 10,
            width: "100%",
            padding: 5,
            backgroundColor: appColors.grey,
            borderRadius: 7,
          }}
        >
          {keys.map((key) => {
            const isActive = active === key
            return (
              <TouchableOpacity
                key={key}
                onPress={() => setActive(key)}
                style={{
                  width: `${itemWidth}%`,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 40,
                  backgroundColor: isActive ? appColors.text : "transparent",
                  borderRadius: 5,
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <Text
                  style={{
                    color: isActive ? appColors.background : appColors.text,
                    fontFamily: "MontserratMedium",
                    fontSize: 12,
                  }}
                >
                  {key}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      <View style={{ marginBottom: 100 }}>{data[active]}</View>
    </View>
  )
}

export default Tab

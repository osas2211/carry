import { View, Text, StyleSheet } from "react-native"
import React from "react"
import { Input } from "@/components/ui/Input"
import { appColors } from "@/constants/Colors"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { Picker } from "@react-native-picker/picker"
import RNPickerSelect from "react-native-picker-select"

export const DestinationAndPackage = () => {
  return (
    <View style={{ gap: 15 }}>
      <Text style={{ fontSize: 18, fontWeight: 500 }}>
        Destination & Package
      </Text>
      <View style={{ gap: 15 }}>
        <View>
          <Text style={style.smallText}>From</Text>
          <Input
            style={style.inputBorder}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Pickup location"
          />
        </View>

        <View>
          <Text style={style.smallText}>To</Text>
          <Input
            style={style.inputBorder}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Dropoff location"
          />
        </View>

        <View>
          <Text style={style.smallText}>Package Type</Text>
          {/* <Input
            style={style.inputBorder}
            icon={<EvilIcons name="location" size={24} />}
          /> */}
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Envelope", value: "Envelope" },
              { label: "Small box", value: "Small box" },
              { label: "Food", value: "Food" },
              { label: "Large Package", value: "Large Package" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: appColors.grey,
                // ...style.inputBorder,
                borderWidth: 1,
                borderColor: appColors.blue,
              },
            }}
            placeholder={{ label: "Pick package type" }}
          />
        </View>

        {/* <View>
          <Text style={style.smallText}>Fragile Item</Text>
          <Input style={style.inputBorder} />
        </View> */}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  smallText: { fontWeight: 300, marginBottom: 2, fontSize: 12 },
  inputBorder: { borderRadius: 10, height: 50 },
})

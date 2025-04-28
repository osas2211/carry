import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Input } from "@/components/ui/Input"
import { appColors } from "@/constants/Colors"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import { Picker } from "@react-native-picker/picker"
import RNPickerSelect from "react-native-picker-select"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"

export const DestinationAndPackage = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [isFragile, setIsFragile] = useState(false)
  const [isTemperatureSensitive, setIsTemperatureSensitive] = useState(false)
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: 500 }}>Destination</Text>
      <View style={{ gap: 7 }}>
        <View>
          <Text style={style.smallText}>From</Text>
          <Input
            style={style.inputBorder}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Pickup location"
          />
        </View>

        <View
          style={{
            height: 20,
            borderLeftColor: appColors.blue,
            borderStyle: "dashed",
            borderLeftWidth: 1,
            marginInline: 25,
          }}
        />

        <View>
          <Text style={style.smallText}>To</Text>
          <Input
            style={style.inputBorder}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Dropoff location"
          />
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: 500, marginTop: 5 }}>
        Package
      </Text>
      <View style={{ marginTop: 0 }}>
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

      <View>
        <Text style={style.smallText}>Other Package Infomation</Text>
        <View style={{ marginTop: 8, gap: 15 }}>
          <Checkbox
            lable="Fragile (Is the package fragile?)"
            checked={isFragile}
            onPress={() => {
              setIsFragile(!isFragile)
            }}
          />
          <Checkbox
            lable="Temperature sensitive package"
            checked={isTemperatureSensitive}
            onPress={() => {
              setIsTemperatureSensitive(!isTemperatureSensitive)
            }}
          />
        </View>
      </View>

      <View>
        <Text style={style.smallText}>Note to rider (Optional)</Text>

        <Input
          style={{ ...style.inputBorder, paddingLeft: 16 }}
          // placeholder="Note to Rider"
        />
      </View>

      <Button
        title="Next"
        textColor={appColors.text}
        bgColor={appColors.primary}
        height={55}
        onPress={() => setStep(2)}
      />
    </View>
  )
}

const style = StyleSheet.create({
  smallText: { fontWeight: 300, marginBottom: 2, fontSize: 12 },
  inputBorder: { borderRadius: 10, height: 52 },
})

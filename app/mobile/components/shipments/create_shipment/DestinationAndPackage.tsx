import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { Input } from "@/components/ui/Input"
import { appColors } from "@/constants/Colors"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import RNPickerSelect from "react-native-picker-select"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { GooglePlaceDetail } from "react-native-google-places-autocomplete"
import { CreateShipmentFormI } from "./create-form-type"

export const DestinationAndPackage = ({
  setStep,
  setForm,
  form,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setForm: React.Dispatch<React.SetStateAction<CreateShipmentFormI>>
  form: CreateShipmentFormI
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
            style={{ borderRadius: 10 }}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Pickup location"
            inputType="google-places-input"
            onChangeGooglePlace={(detail) =>
              setForm((prev) => ({ ...prev, from: detail }))
            }
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
            style={{ borderRadius: 10 }}
            icon={<EvilIcons name="location" size={24} />}
            placeholder="Dropoff location"
            inputType="google-places-input"
            onChangeGooglePlace={(detail) =>
              setForm((prev) => ({ ...prev, to: detail }))
            }
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
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, packageType: value }))
          }
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
              setForm((prev) => ({ ...prev, isFragile: !isFragile }))
            }}
          />
          <Checkbox
            lable="Temperature sensitive package"
            checked={isTemperatureSensitive}
            onPress={() => {
              setIsTemperatureSensitive(!isTemperatureSensitive)
              setForm((prev) => ({
                ...prev,
                isTemperateSensitive: !isTemperatureSensitive,
              }))
            }}
          />
        </View>
      </View>

      <View>
        <Text style={style.smallText}>Note to rider (Optional)</Text>

        <Input
          style={{ ...style.inputBorder, paddingLeft: 16 }}
          // placeholder="Note to Rider"
          onChangeText={(text) => setForm((prev) => ({ ...prev, note: text }))}
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

import { View, Text, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/Input"
import { appColors } from "@/constants/Colors"
import EvilIcons from "@expo/vector-icons/EvilIcons"
import RNPickerSelect from "react-native-picker-select"
import { Checkbox } from "@/components/ui/Checkbox"
import { Button } from "@/components/ui/Button"
import { GooglePlaceDetail } from "react-native-google-places-autocomplete"
import { CreateShipmentFormI } from "./create-form-type"
import { getItem } from "expo-secure-store"
import { AUTH_TOKEN } from "@/constants/key_strings"
import { jwtDecode } from "jwt-decode"

export const DestinationAndPackage = ({
  setStep,
  setForm,
  form,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setForm: React.Dispatch<React.SetStateAction<CreateShipmentFormI>>
  form: CreateShipmentFormI
}) => {
  const [required_fields, setRequired_fields] = useState({
    from: false,
    to: false,
    packageType: false,
  })

  const [isFragile, setIsFragile] = useState(false)
  const [isTemperatureSensitive, setIsTemperatureSensitive] = useState(false)

  const handleSubmit = () => {
    if (!form.from) {
      setRequired_fields((prev) => ({ ...prev, from: true }))
    }
    if (!form.to) {
      setRequired_fields((prev) => ({ ...prev, to: true }))
    }
    if (!form.packageType) {
      setRequired_fields((prev) => ({ ...prev, packageType: true }))
    }
    if (form.from && form.to && form.packageType) {
      setStep(2)
    }
  }
  const token = getItem(AUTH_TOKEN)
  // const decoded = jwtDecode(token || "")
  console.log(token?.split("."))
  // alert(token)

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
            onChangeGooglePlace={(detail) => {
              setForm((prev) => ({ ...prev, from: detail }))
              setRequired_fields((prev) => ({ ...prev, from: false }))
            }}
          />
          {required_fields.from && (
            <Text style={style.errorText}>Pickup address is required</Text>
          )}
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
            onChangeGooglePlace={(detail) => {
              setForm((prev) => ({ ...prev, to: detail }))
              setRequired_fields((prev) => ({ ...prev, to: false }))
            }}
          />
          {required_fields.to && (
            <Text style={style.errorText}>Dropoff address is required</Text>
          )}
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: 500, marginTop: 5 }}>
        Package
      </Text>
      <View style={{ marginTop: 0 }}>
        <Text style={style.smallText}>Package Title</Text>

        {/* <RNPickerSelect
          onValueChange={(value) => {
            setForm((prev) => ({ ...prev, packageType: value }))
            setRequired_fields((prev) => ({ ...prev, packageType: false }))
          }}
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
        /> */}
        <Input
          style={{ ...style.inputBorder, paddingLeft: 16 }}
          placeholder="Enter title of the package"
          onChangeText={(value) => {
            setForm((prev) => ({ ...prev, packageType: value }))
            setRequired_fields((prev) => ({ ...prev, packageType: false }))
          }}
        />
      </View>
      {required_fields.packageType && (
        <Text style={style.errorText}>Package Title is required</Text>
      )}

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
        textColor={appColors.primary}
        bgColor={appColors.primary_low}
        height={55}
        onPress={handleSubmit}
      />
    </View>
  )
}

const style = StyleSheet.create({
  smallText: { fontWeight: 300, marginBottom: 2, fontSize: 12 },
  inputBorder: { borderRadius: 10, height: 52 },
  errorText: { fontSize: 10, color: appColors.error },
})

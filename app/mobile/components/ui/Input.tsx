import React, { ReactNode } from "react"
import { appColors } from "@/constants/Colors"
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native"
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete"

interface props extends TextInputProps {
  icon?: ReactNode
  label?: string
  inputType?: "google-places-input" | "normal-input"
  onChangeGooglePlace?: (detail: GooglePlaceDetail) => void
}
export const Input = (props: props) => {
  let baseStyle = {
    backgroundColor: appColors.grey,
    height: 50,
    borderRadius: 20,
    paddingLeft: 45,
  }
  let style: StyleProp<TextStyle> = props?.style
    ? {
        ...baseStyle,
        ...(props.style as object),
      }
    : baseStyle
  return (
    <View style={{ position: "relative" }}>
      {props.label && <Text style={{ marginBottom: 4 }}>{props.label}</Text>}

      {props?.inputType === "google-places-input" ? (
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          disableScroll
          {...props}
          styles={{ textInput: style }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details)
            if (details) {
              props?.onChangeGooglePlace && props?.onChangeGooglePlace(details)
            }
          }}
          textInputProps={{
            onChangeText: props.onChangeText,
            // value: props.value,
          }}
          listViewDisplayed={false}
          fetchDetails={true}
        />
      ) : (
        <TextInput {...props} style={style} />
      )}
      <View
        style={{
          position: "absolute",
          top: props.label ? 34 : 15,
          left: 15,
          transform: "translateY(-0%)",
        }}
      >
        {props?.icon}
      </View>
    </View>
  )
}

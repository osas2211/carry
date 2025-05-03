import React, { useState } from "react"
import {
  View,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Pressable,
  Text,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Button } from "./Button"
import { AntDesign } from "@expo/vector-icons"

const CLOUDINARY_UPLOAD_PRESET = "v9xpnnhq"
const CLOUDINARY_CLOUD_NAME = "osaretinfrank"
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export default function UploadImage({
  label,
  setImageUrl,
}: {
  label?: string
  setImageUrl?: React.Dispatch<React.SetStateAction<string>>
}) {
  const [image, setImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const asset = result.assets[0]
      setImage(asset.uri)
      uploadImage(asset.uri)
    }
  }

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any)
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.secure_url) {
        Alert.alert("Upload Successful!", "Image uploaded to Cloudinary.")
        // console.log("Uploaded URL:", data.secure_url)
        setImageUrl && setImageUrl(data?.secure_url)
      } else {
        console.error("Upload error:", data)
        Alert.alert("Upload failed", "Could not upload image.")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      Alert.alert("Upload failed", "An error occurred.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
        <View
          style={{
            padding: 16,
            paddingBlock: 14,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
          <AntDesign name="camerao" size={24} />
          <Text>Pick an image</Text>
        </View>
      </Pressable>
      {uploading && (
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size="small" color="#0000ff" />
          <Text>Uploading image...</Text>
        </View>
      )}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ ...styles.image, opacity: uploading ? 0.5 : 1 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // marginTop: 50,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
})

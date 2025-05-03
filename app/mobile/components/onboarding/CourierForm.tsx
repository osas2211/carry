import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { connectWallet } from "@/helpers/connectWallet"
import { CreateUserDTO, UserRole } from "@/@types/user"
import { USER_PUBLIC_KEY } from "@/constants/key_strings"
import { getValue } from "@/helpers/secureStoreHelpers"
import { API_URL } from "@/constants/urls"
import axios from "axios"
import { router } from "expo-router"
import UploadImage from "../ui/UploadImage"

const CourierOnboardingForm = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company_name: "",
    address: "",
  })
  const handleJoin = async () => {
    try {
      setIsLoading(true)
      await connectWallet()
      const pubKey = (await getValue(USER_PUBLIC_KEY)) || ""
      const data: CreateUserDTO = {
        username: `${form.firstName} ${form.lastName}`,
        walletAddress: pubKey,
        role: UserRole.COURIER,
        avatarUrl: imageUrl,
      }
      // console.log(data)
      console.clear()
      const response = await axios.post(`${API_URL}/users`, data)
      setIsLoading(false)
      alert("Joined successfully")
      console.log(response.data)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <View style={{ gap: 25, paddingBlock: 25 }}>
      <Input
        style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
        placeholder="Enter Firstname"
        label="Firstname"
        onChangeText={(text) =>
          setForm((form) => ({ ...form, firstName: text }))
        }
      />
      <Input
        style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
        placeholder="Enter Lastname"
        label="Lastname"
        onChangeText={(text) =>
          setForm((form) => ({ ...form, lastName: text }))
        }
      />

      <Input
        style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
        placeholder="Enter Company name"
        label="Company name"
        onChangeText={(text) =>
          setForm((form) => ({ ...form, company_name: text }))
        }
      />

      <Input
        style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
        placeholder="Enter Email for support"
        label="Email"
        onChangeText={(text) => setForm((form) => ({ ...form, email: text }))}
      />
      <UploadImage label="Upload Profile picture" setImageUrl={setImageUrl} />

      <Button
        title={isLoading ? "Joining..." : "Create account"}
        onPress={handleJoin}
        disabled={isLoading}
      />
      <TouchableOpacity
        onPress={() => router.replace("/onboarding/user")}
        disabled={isLoading}
      >
        <Text style={{ textAlign: "center", textDecorationLine: "underline" }}>
          Join as consumer
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CourierOnboardingForm

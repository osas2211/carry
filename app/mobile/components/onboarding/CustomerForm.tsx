import { View, Text, ScrollView } from "react-native"
import React, { useState } from "react"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { connectWallet } from "@/helpers/connectWallet"
import UploadImage from "../ui/UploadImage"
import axios from "axios"
import { CreateUserDTO, UserRole } from "@/@types/user"
import { getValue } from "@/helpers/secureStoreHelpers"
import { USER_PUBLIC_KEY } from "@/constants/key_strings"

const CustomerOnboardingForm = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    address: "",
  })
  const handleJoin = async () => {
    try {
      setIsLoading(true)
      // await connectWallet()
      const pubKey = (await getValue(USER_PUBLIC_KEY)) || ""
      const data: CreateUserDTO = {
        name: `${form.firstName} ${form.lastName}`,
        address: "37hkfs82",
        role: UserRole.NORMAL_USER,
        avatar: imageUrl,
      }
      // console.log(data)
      console.clear()
      const response = await axios.post(`http://192.168.0.123:4000/users`, data)
      setIsLoading(false)
      alert("Joined successfully")
      console.log(response)
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
        placeholder="Enter Address"
        label="Address"
        onChangeText={(text) =>
          setForm((form) => ({ ...form, location: text }))
        }
      />

      <Input
        style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
        placeholder="Enter Email for support"
        label="Email"
        onChangeText={(text) => setForm((form) => ({ ...form, email: text }))}
      />

      <UploadImage label="Upload Profile picture" />
      <Button title={isLoading ? "Joining..." : "Join"} onPress={handleJoin} />
    </View>
  )
}

export default CustomerOnboardingForm

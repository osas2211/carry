import { View, Text, ScrollView } from "react-native"
import React from "react"
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { connectWallet } from "@/helpers/connectWallet"

const CustomerOnboardingForm = () => {
  const handleJoin = async () => {
    try {
      await connectWallet()
    } catch (error) {}
  }
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View style={{ gap: 25 }}>
        <Input
          style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
          placeholder="Enter Firstname"
          label="Firstname"
        />
        <Input
          style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
          placeholder="Enter Lastname"
          label="Lastname"
        />

        <Input
          style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
          placeholder="Enter Address"
          label="Address"
        />

        <Input
          style={{ borderRadius: 10, fontSize: 14, paddingLeft: 16 }}
          placeholder="Enter Email for support"
          label="Email"
        />
        <Button title="Join" onPress={handleJoin} />
      </View>
    </ScrollView>
  )
}

export default CustomerOnboardingForm

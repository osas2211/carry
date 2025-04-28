import { View, Text } from "react-native"
import React, { useState } from "react"
import { DestinationAndPackage } from "./DestinationAndPackage"
import { ConfirmShipment } from "@/components/ui/ConfirmShipment"

const CreateForm = () => {
  const [step, setStep] = useState(1)
  return (
    <View style={{ paddingBottom: 50 }}>
      {step === 1 ? (
        <DestinationAndPackage setStep={setStep} />
      ) : (
        <ConfirmShipment setStep={setStep} />
      )}
    </View>
  )
}

export default CreateForm

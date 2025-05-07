import { View, Text } from "react-native"
import React, { useState } from "react"
import { DestinationAndPackage } from "./DestinationAndPackage"
import { ConfirmShipment } from "@/components/shipments/create_shipment/ConfirmShipment"
import { CreateShipmentFormI } from "./create-form-type"

const CreateForm = () => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<CreateShipmentFormI>({
    from: null,
    to: null,
    packageType: "",
  })
  return (
    <View style={{ paddingBottom: 50 }}>
      {step === 1 ? (
        <DestinationAndPackage
          setStep={setStep}
          form={form}
          setForm={setForm}
        />
      ) : (
        <ConfirmShipment setStep={setStep} form={form} setForm={setForm} />
      )}
    </View>
  )
}

export default CreateForm

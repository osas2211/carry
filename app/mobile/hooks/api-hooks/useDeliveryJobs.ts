import { CreateDeliveryJobDto } from "@/@types/delivery_jobs"
import { createDeliverJob } from "@/services/delivery_jobs.service"
import { useMutation } from "@tanstack/react-query"
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "react-native-alert-notification"

export const useCreateDeliveryJob = () => {
  return useMutation({
    mutationFn: (formData: CreateDeliveryJobDto) => {
      return createDeliverJob(formData)
    },
    onError: (error) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error.message,
        button: 'close',
      })
    }, onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Successfully created shipment',
        button: 'close',

      })

    }
  })
}
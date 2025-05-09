import { CreateDeliveryJobDto } from "@/@types/delivery_jobs"
import { acceptShipment, assignShipmentToCourier, createDeliverJob, getSingleShipment, getUserShipments } from "@/services/delivery_jobs.service"
import { useMutation, useQuery } from "@tanstack/react-query"
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

export const useAssignToCourier = () => {
  return useMutation({
    mutationFn: ({ id, courierAddress }: { id: string, courierAddress: string }) => {
      return assignShipmentToCourier(id, courierAddress)
      // return hey(id, courierAddress)
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
        textBody: 'Successfully assigned shipment to courier',
        button: 'close',

      })

    }
  })
}

export const useAcceptShipment = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return acceptShipment(id,)
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
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
        textBody: 'Successfully accepted shipment',
        button: 'close',
      })

    }
  })
}

export const useGetUserShipments = () => {
  return useQuery({
    queryKey: ["all-shipments"],
    queryFn: () => getUserShipments()
  })
}

export const useGetSingleShipment = (shipment_id: string) => {
  return useQuery({
    queryKey: ["shipment", shipment_id],
    queryFn: () => getSingleShipment(shipment_id)
  })
}
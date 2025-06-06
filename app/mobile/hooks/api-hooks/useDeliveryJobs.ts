import { CreateDeliveryJobDto } from "@/@types/delivery_jobs";
import {
  acceptShipment,
  assignShipmentToCourier,
  createDeliverJob,
  deliverShipment,
  getSingleShipment,
  getUserShipments,
  getUserTotalJobs,
  pickupShipment,
} from "@/services/delivery_jobs.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

export const useCreateDeliveryJob = () => {
  return useMutation({
    mutationFn: (formData: CreateDeliveryJobDto) => {
      return createDeliverJob(formData);
    },
    onError: (error: any) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || error.message,
        button: "close",
      });
    },
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Successfully created shipment",
        button: "close",
      });
    },
  });
};

export const useAssignToCourier = () => {
  return useMutation({
    mutationFn: ({
      id,
      courierAddress,
    }: {
      id: string;
      courierAddress: string;
    }) => {
      return assignShipmentToCourier(id, courierAddress);
      // return hey(id, courierAddress)
    },
    onError: (error: any) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || error.message,
        button: "close",
      });
    },
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Successfully assigned shipment to courier",
        button: "close",
      });
    },
  });
};

export const useAcceptShipment = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return acceptShipment(id);
    },
    onError: (error: any) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || error.message,
        button: "close",
      });
    },
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Successfully accepted shipment",
        button: "close",
      });
    },
  });
};

export const usePickupShipment = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return pickupShipment(id);
    },
    onError: (error: any) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || error.message,
        button: "close",
      });
    },
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Successfully picked up shipment",
        button: "close",
      });
    },
  });
};

export const useDeliveryShipment = () => {
  return useMutation({
    mutationFn: (id: string) => {
      return deliverShipment(id);
    },
    onError: (error: any) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: error?.response?.data?.message || error.message,
        button: "close",
      });
    },
    onSuccess: () => {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Successfully delivered shipment",
        button: "close",
      });
    },
  });
};

export const useGetUserShipments = () => {
  return useQuery({
    queryKey: ["all-shipments"],
    queryFn: () => getUserShipments(),
  });
};

export const useGetTotalUserJobs = () => {
  return useQuery({
    queryKey: ["user-total-jobs"],
    queryFn: () => getUserTotalJobs(),
  });
};

export const useGetSingleShipment = (shipment_id: string) => {
  return useQuery({
    queryKey: ["shipment", shipment_id],
    queryFn: () => getSingleShipment(shipment_id),
  });
};

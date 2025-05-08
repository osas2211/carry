import { CreateDeliveryJobDto, DeliveryJobI } from "@/@types/delivery_jobs"
import { api } from "@/api/api.instance"
import { API_URL } from "@/constants/urls"

export const createDeliverJob = async (formData: CreateDeliveryJobDto) => {
  const response = await api.post(`/jobs`, formData)
  return response.data as DeliveryJobI
}

export const getUserShipments = async () => {
  const response = await api.get(`/jobs/user-shipments`)
  return response.data as { data: DeliveryJobI[] }
}

export const getSingleShipment = async (tracking_id: string) => {
  const response = await api.get(`/jobs/${tracking_id}`)
  return response.data.data as DeliveryJobI
}
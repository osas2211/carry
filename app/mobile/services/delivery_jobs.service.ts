import { CreateDeliveryJobDto, DeliveryJobI } from "@/@types/delivery_jobs"
import { api } from "@/api/api.instance"
import { API_URL } from "@/constants/urls"

export const createDeliverJob = async (formData: CreateDeliveryJobDto) => {
  const response = await api.post(`${API_URL}/jobs`, formData)
  return response.data as DeliveryJobI
}
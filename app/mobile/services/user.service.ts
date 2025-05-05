import { UserProfile } from "@/@types/user"
import { api } from "@/api/api.instance"
import { AxiosResponse } from "axios"

export const getUser = async () => {
  const response = await api.get(`/users/profile`)
  return response.data as UserProfile
}
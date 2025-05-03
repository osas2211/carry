import { UserProfile } from "@/@types/user"
import { api } from "@/api/api.instance"
import { AxiosResponse } from "axios"

export const getUser = async (walletAddress: string) => {
  const response = await api.get(`/users/${walletAddress}`)
  return response.data as UserProfile
}
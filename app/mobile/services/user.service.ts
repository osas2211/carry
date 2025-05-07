import { UserProfile } from "@/@types/user"
import { api } from "@/api/api.instance"

export const getUser = async () => {
  const response = await api.get(`/users/profile`)
  return response.data as UserProfile
}

export const generateUserToken = async (pubKey: string) => {
  const response = await api.post(`/users/generate-server-token`, { pubKey })
  return response.data as { token: string }
}
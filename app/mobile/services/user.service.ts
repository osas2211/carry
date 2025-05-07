import { UserProfile } from "@/@types/user"
import { api } from "@/api/api.instance"

export const getUser = async () => {
  const response = await api.get(`/users/profile`)
  return response.data as UserProfile
}
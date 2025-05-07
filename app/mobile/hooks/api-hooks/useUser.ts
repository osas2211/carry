import { USER_PUBLIC_KEY } from "@/constants/key_strings"
import { getUser } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"
import { getItem } from "expo-secure-store"

export const useGetUser = () => {
  const walletAddress = getItem(USER_PUBLIC_KEY) || ""
  return useQuery({
    queryKey: ["user", walletAddress],
    queryFn: () => getUser()
  })
}
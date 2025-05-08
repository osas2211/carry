import { AUTH_TOKEN, BASE_58_PUBLIC_KEY, SERVER_AUTH_TOKEN, SIGNATURE, SIGNATURE_MESSAGE, USER_PUBLIC_KEY } from "@/constants/key_strings"
import { API_URL } from "@/constants/urls"
import axios from "axios"
import { getItem } from "expo-secure-store"



export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

api.interceptors.request.use(
  (config) => {
    const signature = getItem(SIGNATURE)
    const publicKey = getItem(USER_PUBLIC_KEY)
    const message = getItem(SIGNATURE_MESSAGE)
    const token = getItem(SERVER_AUTH_TOKEN)


    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (publicKey) {
      config.headers["x-wallet-address"] = publicKey
    }
    if (publicKey) {
      config.headers["x-wallet-message"] = message
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
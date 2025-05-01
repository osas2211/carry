import { AUTH_TOKEN } from "@/constants/key_strings"
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
    const token = getItem(AUTH_TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
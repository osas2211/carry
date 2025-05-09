import { API_URL } from "@/constants/urls"
import { io } from "socket.io-client"
export const socket = io(API_URL)
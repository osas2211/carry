export type MessageType = "text" | "image"

export interface ChatUser {
  name: string
  profile_url: string
  online_status: boolean
  user_id?: string

}

export interface Chat {
  chat_id: string
  createdAt: string
  last_message: string
  messageType: MessageType
  user: ChatUser
  is_read: boolean
  unread_message_count: number
  delivered: boolean
  from_me: boolean
}



export interface Message {
  chat_id: string
  createdAt: string
  message: string
  messageType: "image" | "text"
  user: ChatUser
  is_read: boolean
  delivered: boolean
  sender_id: string
  image_url: string | null
}

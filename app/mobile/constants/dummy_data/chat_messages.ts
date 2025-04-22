// messages.ts

import { Message } from "@/@types/chat"


export const dummy_messages: Message[] = [
  // Messages for chat_001 - Alice Johnson
  {
    chat_id: "chat_001",
    createdAt: "2025-04-13T10:00:00Z",
    message: "Hey, how's it going?",
    messageType: "text",
    user: {
      name: "Alice Johnson",
      profile_url: "https://randomuser.me/api/portraits/women/1.jpg",
      online_status: true,
      user_id: "user_1",
    },
    is_read: true,
    delivered: true,
    sender_id: "user_1",
    image_url: null,
  },
  {
    chat_id: "chat_001",
    createdAt: "2025-04-13T10:05:00Z",
    message: "The #1 tool for Procurement. From intake to pay, our AI agents automate all your procurement processes. Take the first step towards smarter procurement.",
    messageType: "text",
    user: {
      name: "You",
      profile_url: "https://randomuser.me/api/portraits/lego/1.jpg",
      online_status: true,
      user_id: "123456789",
    },
    is_read: true,
    delivered: true,
    sender_id: "123456789",
    image_url: null,
  },
  {
    chat_id: "chat_001",
    createdAt: "2025-04-13T10:10:00Z",
    message: "Check this out!",
    messageType: "image",
    user: {
      name: "Alice Johnson",
      profile_url: "https://randomuser.me/api/portraits/women/1.jpg",
      online_status: true,
      user_id: "user_1",
    },
    is_read: false,
    delivered: true,
    sender_id: "user_1",
    image_url: "https://picsum.photos/300/200?random=1",
  },
  {
    chat_id: "chat_001",
    createdAt: "2025-04-13T10:15:00Z",
    message: "Looks great to me.",
    messageType: "text",
    user: {
      name: "You",
      profile_url: "https://randomuser.me/api/portraits/lego/1.jpg",
      online_status: true,
      user_id: "123456789",
    },
    is_read: true,
    delivered: true,
    sender_id: "123456789",
    image_url: null,
  },
  {
    chat_id: "chat_001",
    createdAt: "2025-04-13T10:20:00Z",
    message: "Thanks!",
    messageType: "text",
    user: {
      name: "Alice Johnson",
      profile_url: "https://randomuser.me/api/portraits/women/1.jpg",
      online_status: true,
      user_id: "user_1",
    },
    is_read: true,
    delivered: true,
    sender_id: "user_1",
    image_url: null,
  },

  // Add 15 more alternating messages for chat_001...

  // Messages for chat_002 - Bob Smith
  {
    chat_id: "chat_002",
    createdAt: "2025-04-13T09:00:00Z",
    message: "Good morning!",
    messageType: "text",
    user: {
      name: "Bob Smith",
      profile_url: "https://randomuser.me/api/portraits/men/2.jpg",
      online_status: false,
      user_id: "user_2",
    },
    is_read: true,
    delivered: true,
    sender_id: "user_2",
    image_url: null,
  },
  {
    chat_id: "chat_002",
    createdAt: "2025-04-13T09:05:00Z",
    message: "Morning Bob!",
    messageType: "text",
    user: {
      name: "You",
      profile_url: "https://randomuser.me/api/portraits/lego/1.jpg",
      online_status: true,
      user_id: "123456789",
    },
    is_read: true,
    delivered: true,
    sender_id: "123456789",
    image_url: null,
  },
  {
    chat_id: "chat_002",
    createdAt: "2025-04-14T09:10:00Z",
    message: "Any update on the project?",
    messageType: "image",
    user: {
      name: "Bob Smith",
      profile_url: "https://randomuser.me/api/portraits/men/2.jpg",
      online_status: false,
      user_id: "user_2",
    },
    is_read: false,
    delivered: true,
    sender_id: "user_2",
    image_url: "https://picsum.photos/300/200?random=2",
  },
  {
    chat_id: "chat_002",
    createdAt: "2025-04-14T09:15:00Z",
    message: "Yes! I'll push the changes now.",
    messageType: "text",
    user: {
      name: "You",
      profile_url: "https://randomuser.me/api/portraits/lego/1.jpg",
      online_status: true,
      user_id: "123456789",
    },
    is_read: true,
    delivered: true,
    sender_id: "123456789",
    image_url: null,
  },

  // Add 16 more alternating messages for chat_002...

  // Messages for chat_003 - Charlie Rivers
  {
    chat_id: "chat_003",
    createdAt: "2025-04-13T08:00:00Z",
    message: "Can you review this doc?",
    messageType: "text",
    user: {
      name: "Charlie Rivers",
      profile_url: "https://randomuser.me/api/portraits/men/3.jpg",
      online_status: true,
      user_id: "user_3",
    },
    is_read: true,
    delivered: true,
    sender_id: "user_3",
    image_url: null,
  },
  {
    chat_id: "chat_003",
    createdAt: "2025-04-13T08:05:00Z",
    message: "Sure! Send it over.",
    messageType: "text",
    user: {
      name: "You",
      profile_url: "https://randomuser.me/api/portraits/lego/1.jpg",
      online_status: true,
      user_id: "123456789",
    },
    is_read: true,
    delivered: true,
    sender_id: "123456789",
    image_url: null,
  },
  {
    chat_id: "chat_003",
    createdAt: "2025-04-13T08:10:00Z",
    message: "Here’s a screenshot.",
    messageType: "image",
    user: {
      name: "Charlie Rivers",
      profile_url: "https://randomuser.me/api/portraits/men/3.jpg",
      online_status: true,
      user_id: "user_3",
    },
    is_read: false,
    delivered: true,
    sender_id: "user_3",
    image_url: "https://picsum.photos/300/200?random=3",
  },

  // Add 17 more alternating messages for chat_003...
]

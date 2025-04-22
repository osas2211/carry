import { Message } from "@/@types/chat"

export interface GroupedMessages {
  date: string
  messages: Message[]
}

export function groupMessagesByDate(messages: Message[]): GroupedMessages[] {
  const today = new Date().toISOString().split("T")[0] // "YYYY-MM-DD"
  const grouped: { [date: string]: Message[] } = {}

  messages.forEach((msg) => {
    const msgDate = new Date(msg.createdAt).toISOString().split("T")[0]
    const key = msgDate === today ? "Today" : msgDate

    if (!grouped[key]) {
      grouped[key] = []
    }

    grouped[key].push(msg)
  })

  // Convert to array and sort by date descending
  const result: GroupedMessages[] = Object.entries(grouped)
    .map(([date, msgs]) => ({
      date,
      messages: msgs.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    }))
    .sort((a, b) => {
      const dateA = a.date === "Today" ? today : a.date
      const dateB = b.date === "Today" ? today : b.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })

  return result
}

export function truncateText(text: string, chars = 4): string {
  if (text.length <= chars * 2) return text
  return `${text.slice(0, chars)}...${text.slice(-chars)}`
}

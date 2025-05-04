export function calculateETA(
  distanceKm: number = 1,
  speedKmph: number = 1
): string {
  if (speedKmph <= 0) {
    throw new Error("Speed must be greater than zero.")
  }

  const now = new Date()
  const arrivalTime = addHoursToDate(now, distanceKm / speedKmph)
  return arrivalTime.toISOString()
}

export function addHoursToDate(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

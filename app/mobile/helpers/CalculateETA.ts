export function calculateETA(
  distanceKm: number = 1,
  speedKmph: number = 1
): { eta_date: string; eta_time: string } {
  if (speedKmph <= 0) {
    throw new Error("Speed must be greater than zero.")
  }

  const etaHours = distanceKm / speedKmph
  const now = new Date()
  const arrivalTime = addHoursToDate(now, distanceKm / speedKmph)
  return {
    eta_date: arrivalTime.toISOString(),
    eta_time: formatHoursToHM(etaHours),
  }
}

export function addHoursToDate(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

export function formatHoursToHM(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h} hr${h !== 1 ? "s" : ""} ${m} min${m !== 1 ? "s" : ""}`
}

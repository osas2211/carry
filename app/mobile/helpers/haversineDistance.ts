export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function haversineDistance(
  lat1: number = 0,
  lon1: number = 0,
  lat2: number = 0,
  lon2: number = 0
): number {
  const R = 6371 // Earth's radius in kilometers. Use 3958.8 for miles

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}



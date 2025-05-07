import { GooglePlaceDetail } from "react-native-google-places-autocomplete"

export interface CreateShipmentFormI {
  from: GooglePlaceDetail | null
  to: GooglePlaceDetail | null
  packageType: string
  isFragile?: boolean
  isTemperateSensitive?: boolean
  note?: string
}
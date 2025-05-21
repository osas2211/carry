import Geocoder from 'react-native-geocoding'

// Initialize the module (needs to be done only once)
Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "") // use a valid API key
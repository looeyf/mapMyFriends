import * as Location from 'expo-location';

Location.requestPermissionsAsync();

export async function getLocationByAddress(address) {
  const result = await Location.geocodeAsync(address);
  if (result) {
    const coords = {
      latitude: result[0].latitude,
      longitude: result[0].longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return coords;
  }
}

export async function getCurrentPosition() {
  const result = await Location.getCurrentPositionAsync({});

  if (result) {
    const coords = {
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return coords;
  }
}

import React from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default function Maps() {
  return (
    <View style={styles.container}>
      <MapView style={styles.mapContainer} />
    </View>
  );
}

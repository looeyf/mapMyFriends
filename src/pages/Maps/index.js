import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { getCurrentPosition } from '../../utils/functions';

import { index } from '../../controllers/FriendController';

import styles from './styles';

export default function Maps() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myLocation, setMyLocation] = useState(null);

  const myLocationColor = '#f3f3';
  const friendsLocationColor = '#f667';

  useEffect(() => {
    (async () => {
      setMyLocation(await getCurrentPosition());
    })();

    const friendsData = index();

    friendsData.on('value', (snapshot) => {
      let friends = snapshot.val();
      let newFriends = [];
      for (let friend in friends) {
        newFriends.push({
          id: friend,
          nome: friends[friend].nome,
          telefone: friends[friend].telefone,
          endereco: friends[friend].endereco,
          coords: friends[friend].coords,
        });
      }
      setFriends(newFriends);
      setLoading(false);
    });

    return () => friendsData.off('value');
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0D98BA' animating />
        </View>
      ) : (
        <MapView
          style={styles.mapContainer}
          initialRegion={myLocation}
          region={myLocation}
        >
          {myLocation ? (
            <Marker
              pinColor={myLocationColor}
              coordinate={myLocation}
              title='Minha localização!'
              description='Minha localização!'
            />
          ) : null}

          {friends
            ? friends.map((friend) => (
                <Marker
                  key={friend.id}
                  pinColor={friendsLocationColor}
                  coordinate={friend.coords}
                  title='Amigo'
                  description={`Esta é a casa de ${friend.nome}!`}
                />
              ))
            : null}
        </MapView>
      )}
    </View>
  );
}

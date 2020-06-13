import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';

import { index, remove } from '../../controllers/FriendController';

import styles from './styles';

export default function Friends({ navigation }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        });
      }
      setFriends(newFriends);
      setLoading(false);
    });

    return () => friendsData.off('value');
  }, []);

  function handleDelete(itemID) {
    Alert.alert(
      'Cuidado!',
      'Deseja deletar este amigo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () =>
            remove(itemID)
              .then(() =>
                Alert.alert('', 'Amigo deletado com sucesso!', [{ text: 'OK' }])
              )
              .catch(() =>
                Alert.alert(
                  'Erro!',
                  'Houve um problema ao deletar este amigo.',
                  [{ text: 'Ok' }]
                )
              ),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NewFriend')}
      >
        <Text>Adicionar amigo</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0D98BA' animating />
        </View>
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <View style={styles.friendsContainer}>
              <Text>Nome: {item.nome}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>Endereço: {item.endereco}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );
}

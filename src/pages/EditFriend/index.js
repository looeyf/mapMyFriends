import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { getFriend, update } from '../../controllers/FriendController';

import styles from './styles';

export default function EditFriend({ navigation, route }) {
  const { FriendID } = route.params;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const friendData = getFriend(FriendID);

    friendData.on('value', (snapshot) => {
      let friend = snapshot.val();

      setNome(friend.nome);
      setTelefone(friend.telefone);
      setEndereco(friend.endereco);
      setLoading(false);
    });

    return () => friendData.off('value');
  }, []);

  function handleSubmit() {
    update(FriendID, {
      nome: nome,
      telefone: telefone,
      endereco: endereco,
    })
      .then(() => {
        Alert.alert('', 'Amigo atualizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Friends') },
        ]);
      })
      .catch(() =>
        Alert.alert('Aviso', 'Houve um problema ao atualizar os dados.', [
          { text: 'OK' },
        ])
      );
  }

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#0D98BA' animating />
        </View>
      ) : (
        <View style={styles.container}>
          <Text>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={(value) => setNome(value)}
          />

          <Text>telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={(value) => setTelefone(value)}
            keyboardType='number-pad'
          />

          <Text>Endereço</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={(value) => setEndereco(value)}
          />

          <Button
            style={styles.submitButton}
            title='Salvar'
            onPress={() =>
              handleSubmit({
                nome: nome,
                telefone: telefone,
                endereco: endereco,
              })
            }
          />
        </View>
      )}
    </>
  );
}

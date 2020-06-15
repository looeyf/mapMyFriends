import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

import { create } from '../../controllers/FriendController';

import { getLocationByAddress } from '../../utils/functions';

import styles from './styles';

export default function NewFriend({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  async function handleSubmit() {
    const location = await getLocationByAddress(endereco);
    create({
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      coords: location,
    })
      .then(() =>
        Alert.alert(
          '',
          'Amigo cadastrado com sucesso!',
          [{ text: 'OK', onPress: () => navigation.navigate('Friends') }],
          {
            cancelable: false,
          }
        )
      )
      .catch((error) => console.log(error.message));
  }

  return (
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
        onPress={() => handleSubmit()}
      />
    </View>
  );
}

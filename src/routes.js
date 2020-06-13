import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Homepage from './pages/Homepage';
import Friends from './pages/Friends';
import NewFriend from './pages/NewFriend';
import Maps from './pages/Maps';

const Stack = createStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Homepage}
          options={{
            headerTitleAlign: 'center',
            title: 'Map my friends',
          }}
        />
        <Stack.Screen
          name='Friends'
          component={Friends}
          options={{
            headerTitleAlign: 'center',
            title: 'Amigos',
          }}
        />
        <Stack.Screen
          name='NewFriend'
          component={NewFriend}
          options={{
            headerTitleAlign: 'center',
            title: 'Adicionar amigo',
          }}
        />
        <Stack.Screen
          name='Maps'
          component={Maps}
          options={{
            headerTitleAlign: 'center',
            title: 'Mapa',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

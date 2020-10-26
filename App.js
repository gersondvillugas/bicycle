import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registro  from './components/Registro/index'
import Login  from './components/Login/index'
import Localisation  from './components/Localisation/index'
import SetLocation from './components/Setlocation/index'
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Registro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Localisation" component={Localisation} />
        <Stack.Screen name="SetLocation" component={SetLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export  default App;
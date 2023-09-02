import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import SavedQuotes from './screens/SavedQuotes';
import CustomButton from './CustomButton';
import { StyleSheet, Text, TextInput, View, SafeAreaView,TouchableOpacity } from 'react-native';
const Stack = createNativeStackNavigator();

export default function App() {
  const [logged, setLogged] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          options={{ title: 'Login', headerShown: false }}
        >
          {(props) => <Login {...props} setLogin={setLogged} />}
        </Stack.Screen>
          <Stack.Screen
              name="Home"
              options={({ navigation }) => ({
                title: 'Home',
              })}
            >
              {(props) => <HomeScreen {...props} logged={logged} setLogged={setLogged} />}
            </Stack.Screen>
        <Stack.Screen
          name="SavedQuotes"
          component={SavedQuotes}
          options={{ title: 'Saved Quotes', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

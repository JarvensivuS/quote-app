import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import Login from './screens/Login';
import SavedQuotes from './screens/SavedQuotes';
import CustomButton from './CustomButton';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [logged, setLogged] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <CustomButton
                title="Logout"
                onPress={() => {
                  setLogged(false);
                }}
              />
            ),
          })}
        >
          {(props) => <HomeScreen {...props} logged={logged} setLogged={setLogged} />}
        </Stack.Screen>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SavedQuotes" component={SavedQuotes} options={{ title: 'Saved Quotes', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

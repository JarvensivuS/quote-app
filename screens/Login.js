import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '../CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function Login({ setLogin }) {
  const navigation = useNavigation();
  const [userName, setUsername] = useState('test1@foo.com');
  const [password, setPassword] = useState('test1234');

  navigation.setOptions({
    title: 'Login',
    headerShown: false,
  });

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setLogin(true);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          console.log('Invalid credentials');
        } else if (error.code === 'auth/too-many-requests') {
          console.log('Too many attempts to login');
        } else {
          console.log(error.code + ' ' + error.message);
        }
      });

  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.fieldLabel}>Username</Text>
        <TextInput
          style={styles.fieldInput}
          value={userName}
          onChangeText={(text) => setUsername(text)}
          keyboardType="email-address"
        />
        <Text style={styles.fieldLabel}>Password</Text>
        <TextInput
          style={styles.fieldInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <CustomButton title="Login" onPress={login} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  fieldInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

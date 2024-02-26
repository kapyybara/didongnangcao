import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

import {signInUserPassword, signOut} from '../services/oauth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function Home() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function login() {
    if (email && pass) {
      signInUserPassword(email, pass);
    }
  }

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1001594119325-811nagealsrkjosnatvp04task26o0mm.apps.googleusercontent.com',
    });
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={{padding: 10}}>
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your email!"
          onChangeText={value => setEmail(value)}
          defaultValue={email}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter your email!"
          onChangeText={value => setPass(value)}
          defaultValue={pass}
        />
        <Button onPress={login} title="Login" />
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Signout" onPress={() => signOut()} />
    </View>
  );
}

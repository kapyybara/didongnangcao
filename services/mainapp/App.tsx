import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import CustomNavigationBar from './src/components/CustomNavigationBar';
import { signInUserPassword } from './src/services/oauth';
import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Login from './src/pages/Login';
import SignUpScreen from './src/pages/SignUp';
import AuthHoc from './src/hocs/Auth';
import { DirectusClient } from '@directus/sdk';
import { GlobalContext } from './src/contexts/context';
import { createDirectusInstance } from './src/services/directus';
import ForgetPassword from './src/pages/ForgetPassword';

function HomeScreen({ navigation }: any) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={style.container}>
      <Text>Details Screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
    const directus = createDirectusInstance("http://localhost:8055", "W3ffgmXtH6kMjZ8JkhsBbOm4IdLJVqqI")
  }, []);

  return (
    <GlobalContext.Provider value={GlobalContext}>
      <NavigationContainer>
        <AuthHoc>
          <Stack.Navigator
            initialRouteName={!user ? 'Login' : 'Home'}
            screenOptions={{
              header: props => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </AuthHoc>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

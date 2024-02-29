import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

import {View, StyleSheet} from 'react-native';
import {Text, Button, PaperProvider, DefaultTheme} from 'react-native-paper';
import CustomNavigationBar from './src/components/CustomNavigationBar';
import {signInUserPassword} from './src/services/oauth';
import {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Login from './src/pages/Login';
import SignUpScreen from './src/pages/SignUp';
import AuthHoc from './src/hocs/Auth';
import HomeScreen from './src/pages/Home';
import {initDirectusInstance} from './src/services/directus';
import MainApp from './src/pages';
import { GlobalContext } from './src/contexts/context';

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
    initDirectusInstance(
      'http://10.0.2.2:8055',
      'R6QEzLhfD-2uPm8I7P6ip4PBuxyv63fA',
    );
  }, []);
  if (initializing) {
    return <Text>'loading'</Text>;
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };
  

  return (
    <GlobalContext.Provider value={{user}} >
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthHoc user={user}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: props => <></>,
              // header: props => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={MainApp} />
          </Stack.Navigator>
        </AuthHoc>
      </NavigationContainer>
    </PaperProvider>
    </GlobalContext.Provider>

  );
}

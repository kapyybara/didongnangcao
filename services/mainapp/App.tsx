import { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import { DefaultTheme, PaperProvider, Text } from 'react-native-paper'

import CustomNavigationBar from './src/components/CustomNavigationBar'
import Login from './src/pages/Login'
import SignUpScreen from './src/pages/SignUp'
import AuthHoc from './src/hocs/Auth'
import { initDirectusInstance } from './src/services/directus'
import MainApp from './src/pages'
import { GlobalContext } from './src/contexts/context'
import { TransactionCreate } from './src/pages/Transaction/Create'
import { SnackBarHoc } from './src/hocs/SnackBar'
import { ThemeProp } from 'react-native-paper/lib/typescript/types'
import AccountPage from './src/pages/Account'
import { HeaderContextProvider } from './src/contexts/header'
import AccountNew from './src/pages/Account/New'
import React from 'react'

const Stack = createStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user: any) {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1001594119325-811nagealsrkjosnatvp04task26o0mm.apps.googleusercontent.com',
    })
    initDirectusInstance(
      'http://10.0.2.2:8055',
      'PHJSvS47GDamZO_HSTx2FBm-K15pELyn',
    )
  }, [])
  if (initializing) {
    return <Text>'loading'</Text>
  }
  const theme: ThemeProp = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  }

  return (
    <GlobalContext.Provider value={{ user }}>
      <HeaderContextProvider>
        <PaperProvider theme={theme}>
          <SnackBarHoc>
            <NavigationContainer>
              <AuthHoc user={user}>
                <Stack.Navigator
                  initialRouteName='Home'
                  screenOptions={{
                    header: props => <CustomNavigationBar {...props} />,
                  }}>
                  <Stack.Screen name='SignUp' component={SignUpScreen} />
                  <Stack.Screen name='Login' component={Login} />
                  <Stack.Screen name='Home' component={MainApp} />
                  <Stack.Screen
                    name='Create Transaction'
                    component={TransactionCreate}
                  />
                  <Stack.Screen
                    name='Update Transaction'
                    component={TransactionCreate}
                  />
                  <Stack.Screen name='Account' component={AccountPage} />
                  <Stack.Screen name='Account New' component={AccountNew} />
                </Stack.Navigator>
              </AuthHoc>
            </NavigationContainer>
          </SnackBarHoc>
        </PaperProvider>
      </HeaderContextProvider>
    </GlobalContext.Provider>
  )
}

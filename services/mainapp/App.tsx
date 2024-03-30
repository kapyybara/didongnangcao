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
import AccountNew from './src/pages/Account/createOrUpdate'
import { DirectusUser } from './src/typings/models'
import { getUserByEmail } from './src/controllers/user.controller'
import RegularPayments from './src/pages/Payment'
import EditProfile from './src/pages/Profile/Edit'
import PrivacyPolicy from './src/pages/Profile/Policy'
import Support from './src/pages/Support'
import TransferHistory from './src/pages/Transfer'
import CreateTransfer from './src/pages/Transfer/create'

const Stack = createStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<DirectusUser>()

  function onAuthStateChanged(user: any) {
    (async ()=> {
      const directusUser = await getUserByEmail(user.email)
      setUser(new DirectusUser(user?.email , directusUser?.fullName))
    if (initializing) setInitializing(false)
    })()
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
      process.env.DIRECTUS_TOKEN || "5P8aI2ZZN4xnF2i5weQeIk28tR33_DQD",
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
                  <Stack.Screen name='Regular Payments' component={RegularPayments} />
                  <Stack.Screen name='Edit Profile' component={EditProfile} />
                  <Stack.Screen name='Privacy Policy' component={PrivacyPolicy} />
                  <Stack.Screen name='Support' component={Support} />
                  <Stack.Screen name='Transfer History' component={TransferHistory} />
                  <Stack.Screen name='Transfer New' component={CreateTransfer} />
                </Stack.Navigator>
              </AuthHoc>
            </NavigationContainer>
          </SnackBarHoc>
        </PaperProvider>
      </HeaderContextProvider>
    </GlobalContext.Provider>
  )
}

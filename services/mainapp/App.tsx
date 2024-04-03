import { useEffect, useState } from 'react'

import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

import { ThemeProp } from 'react-native-paper/lib/typescript/types'
import CustomNavigationBar from './src/components/CustomNavigationBar'
import Loading from './src/components/Loading'
import { GlobalContext } from './src/contexts/context'
import { HeaderContextProvider } from './src/contexts/header'
import { getUserByEmail } from './src/controllers/user.controller'
import AuthHoc from './src/hocs/Auth'
import { SnackBarHoc } from './src/hocs/SnackBar'
import MainApp from './src/pages'
import AccountPage from './src/pages/Account'
import Login from './src/pages/Login'
import RegularPayments from './src/pages/Payment'
import AddPayment from './src/pages/Payment/add'
import EditPayment from './src/pages/Payment/edit'
import EditProfile from './src/pages/Profile/Edit'
import PrivacyPolicy from './src/pages/Profile/Policy'
import SignUpScreen from './src/pages/SignUp'
import { Statistic } from './src/pages/Statistics'
import Support from './src/pages/Support'
import TransactionCreateOrUpdate from './src/pages/Transaction/createOrUpdate'
import TransferHistory from './src/pages/Transfer'
import CreateTransfer from './src/pages/Transfer/create'
import { initDirectusInstance } from './src/services/directus'
import { DirectusUser } from './src/typings/models'
import AllTransactions from './src/pages/Transaction/AllTransactions'

const Stack = createStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<any>()

  const [account, setAccount] = useState('Total')

  function onAuthStateChanged(user: any) {
    ;(async () => {
      if (user?.email) {
        const directusUser = (await getUserByEmail(user?.email))[0]
        setUser(
          new DirectusUser(
            directusUser.id,
            directusUser.email,
            directusUser.full_name,
            directusUser.avatar,
            directusUser.phone_number,
            directusUser.gender,
          ),
        )
      }
      if (initializing) setInitializing(false)
    })()
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1001594119325-811nagealsrkjosnatvp04task26o0mm.apps.googleusercontent.com',
    })
    initDirectusInstance(
      'http://10.0.2.2:8055',
      process.env.DIRECTUS_TOKEN || '1FXqbYQRKL9m-BjUDFzk73Q4p0zbujOY',
    )
  }, [])
  if (initializing) {
    return <Loading />
  }

  const theme: ThemeProp = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  }

  return (
    <GlobalContext.Provider value={{ user, setUser, account, setAccount }}>
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
                  <Stack.Screen name='Statistic' component={Statistic} />
                  <Stack.Screen
                    name='Transaction Info'
                    component={TransactionCreateOrUpdate}
                  />
                  <Stack.Screen
                    name='All Transactions'
                    component={AllTransactions}
                  />
                  <Stack.Screen name='Account' component={AccountPage} />
                  {/* <Stack.Screen name='Account Info' component={AccountNew} /> */}
                  <Stack.Screen
                    name='Regular Payments'
                    component={RegularPayments}
                  />
                  <Stack.Screen name='Edit Profile' component={EditProfile} />
                  <Stack.Screen
                    name='Privacy Policy'
                    component={PrivacyPolicy}
                  />
                  <Stack.Screen name='Support' component={Support} />
                  <Stack.Screen
                    name='Transfer History'
                    component={TransferHistory}
                  />
                  <Stack.Screen
                    name='Transfer New'
                    component={CreateTransfer}
                  />
                  <Stack.Screen name='Add Payment' component={AddPayment} />
                  <Stack.Screen name='Edit Payment' component={EditPayment} />
                </Stack.Navigator>
              </AuthHoc>
            </NavigationContainer>
          </SnackBarHoc>
        </PaperProvider>
      </HeaderContextProvider>
    </GlobalContext.Provider>
  )
}

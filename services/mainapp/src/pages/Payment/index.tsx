import {
  Button,
  Card,
  Icon,
  IconButton,
  Menu,
  Paragraph,
  Switch,
  Text,
} from 'react-native-paper'
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { HeaderContext } from '../../contexts/header'
import PaymentCard from '../../components/PaymentCard'
import { readItems } from '@directus/sdk'
import { directusInstance } from '../../services/directus'
import { GlobalContext } from '../../contexts/context'
import Loading from '../../components/Loading'
import {
  getAccountByName,
  getAccountsByEmail,
} from '../../controllers/account.controller'
import { Account } from '../../types/account'
import { ACCOUNT_KEY, PAYMENT_KEY } from '../../contants/schema-key.constant'
import { allAccount } from '../../contants/transaction/empty-account.constant'

const RegularPayments = ({ props }: any) => {
  const { subfix, setSubfix } = useContext(HeaderContext)
  const navigation = useNavigation()
  const { account, setAccount, user } = useContext(GlobalContext)
  const [accounts, setAccounts] = useState<Account[]>([])
  const gotoAddPayment = () => {
    navigation.navigate('Add Payment')
    setSubfix(null)
  }
  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false)
  const [payments, setPayments] = useState([])
  const isFocused = useIsFocused()

  const fetchAccounts = async () => {
    const accounts = (await directusInstance.request(
      readItems(ACCOUNT_KEY, {
        filter: {
          user_id: user?.id,
        },
        sort: ['-name'],
      }),
    )) as any

    setAccounts([allAccount, ...accounts])
  }

  useEffect(() => {
    ;(async () => {
      try {
        var res = await directusInstance.request(
          readItems(PAYMENT_KEY, {
            filter: {
              account_id:
                account.id == '-1'
                  ? {
                      user_id: user?.id,
                    }
                  : account.id,
            },
          }),
        )
        setPayments(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [account,props, isFocused])

  useEffect(() => {
    user.email && fetchAccounts()
  }, [])

  return (
    <ScrollView className='flex w-full '>
      <View className='flex-1 px-3 pb-3'>
        <TouchableWithoutFeedback
          onPress={() => setShowAccountsDropdown(true)}
          className='mb-2'>
          <View className='flex flex-row justify-start items-center'>
            <View className='flex items-center flex-row gap-2'>
              <Text className='text-lg'>Account: </Text>
              <Text className='font-bold text-base'>{account?.name}</Text>
            </View>
            <Menu
              visible={showAccountsDropdown}
              onDismiss={() => setShowAccountsDropdown(false)}
              anchor={
                <Button>
                  <Icon source='menu-down' color={'black'} size={20} />
                </Button>
              }>
              {accounts.map((acc, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setAccount(acc)
                    setShowAccountsDropdown(false)
                  }}
                  title={acc.name}
                />
              ))}
            </Menu>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View className='flex flex-col w-full '>
        {payments.length > 0 ? (
          payments.map((payment: any) => (
            <PaymentCard
              id={payment.id}
              type={payment.type}
              name={payment.name}
              total={payment.total}
              add_automation={payment.add_automation == 'true'}
              cycle_day={payment.cycle_day}
            />
          ))
        ) : (
          <Text className='w-full h-16 justify-around text-center self-center'>
            You don't have any regular payment yet!
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default RegularPayments

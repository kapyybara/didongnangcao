import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { Button, Icon, Menu, Text } from 'react-native-paper'
import { Account } from '../../../types/account'
import { Transaction } from '../../../types/transaction'
import { GlobalContext } from '../../../contexts/context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { directusInstance } from '../../../services/directus'
import { readItems } from '@directus/sdk'
import {
  ACCOUNT_KEY,
  TRANSACTION_KEY,
} from '../../../contants/schema-key.constant'
import { allAccount } from '../../../contants/transaction/empty-account.constant'
import { ActivityIndicator, FlatList, View } from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { formatVND } from '../../../utils/money'
import TransactionCard from '../../../components/transaction/TransactionCard'
import { HeaderContext } from '../../../contexts/header'

const PAGE_SIZE = 10

export default function AllTransactions(props: any) {
  const { user, account, setAccount } = useContext(GlobalContext)
  const navigation = useNavigation()
  const { subfix, setSubfix } = useContext(HeaderContext)
  const isFocused = useIsFocused(); 

  const [isLoading, setLoading] = useState(false)

  const [accounts, setAccounts] = useState<Account[]>([])
  const [type, setType] = useState(props.route?.params?.type || 'all')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)

  const [page, setPage] = useState(1)
  const [isEndOfList, setEndOfList] = useState(false)

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
    if (isFocused) {
      setSubfix({
        icon: 'plus',
        onPress: () => {
          navigation.navigate('Transaction Information')
          setSubfix(null)
        }
      })
    }
  }, [props, isFocused])

  const fetchTransactions = async () => {
    setLoading(true)
    var filter = {}

    if (type == 'all') {
      filter = {
        account_id: account.id == "-1" ? {
          user_id: user?.id , 
          include_in_balance : "true"
        } : {
          include_in_balance : "true",
          id : account.id
        },
      }
    } else {
      filter = {
        type: type,
        account_id: account.id == "-1" ? {
          user_id: user?.id , 
          include_in_balance : "true"
        } : {
          include_in_balance : "true",
          id : account.id
        },
      }
    }

    const response = (await directusInstance.request(
      readItems(TRANSACTION_KEY, {
        sort: ['-trading_date'],
        filter: filter,
        limit: PAGE_SIZE, // Number of items to return
        offset: (page - 1) * PAGE_SIZE, // Number of items to skip
      }),
    )) as any
    if (response.length < PAGE_SIZE) setEndOfList(true)

    setTransactions(prev => [...prev, ...response])
    setLoading(false)
  }

 
  useEffect(() => {
    user?.email && fetchAccounts() 
  }, [])

  useEffect(() => {
    setTransactions([])
    setPage(1)
    setEndOfList(false)
  }, [account, type])

  useEffect(() => {
    if (account && !isEndOfList) {
      fetchTransactions()
    }
  }, [account, page, isEndOfList, type ])

  return (
    <View className='flex-1 bg-blue-50 px-3 pb-3'>
      <View className='flex flex-row justify-between'>
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
        <TouchableWithoutFeedback
          onPress={() => setShowTypeDropdown(true)}
          className='flex items-end w-fit translate-x-6'>
          <View className='flex flex-row items-center align-right'>
            <View className='flex items-center flex-row gap-2'>
              <Text className='text-lg'>Type: </Text>
              <Text className='font-bold text-base'>{type}</Text>
            </View>
            <Menu
              visible={showTypeDropdown}
              onDismiss={() => setShowTypeDropdown(false)}
              anchor={
                <Button>
                  <Icon source='menu-down' color={'black'} size={20} />
                </Button>
              }>
              <Menu.Item
                key={1}
                onPress={() => {
                  setType('all')
                  setShowTypeDropdown(false)
                }}
                title={'all'}
              />
              <Menu.Item
                key={1}
                onPress={() => {
                  setType('expenses')
                  setShowTypeDropdown(false)
                }}
                title={'expenses'}
              />
              <Menu.Item
                key={2}
                onPress={() => {
                  setType('income')
                  setShowTypeDropdown(false)
                }}
                title={'income'}
              />
            </Menu>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View className='flex-1'>
        <FlatList
          data={transactions}
          renderItem={({ item }) => {
            return <TransactionCard {...item} />
          }}
          keyExtractor={item => item.id}
          ListFooterComponent={() =>
            isLoading ? (
              <View className='my-4 items-center'>
                <ActivityIndicator size='large' color='#aaa' />
              </View>
            ) : (
              <></>
            )
          }
          onEndReached={() =>
            transactions.length > 0 && !isEndOfList && setPage(prev => prev + 1)
          }
          ListEmptyComponent={() => (
            <View className='flex-1 flex items-center justify-center'>
              <Text>Empty</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

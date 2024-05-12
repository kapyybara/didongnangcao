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
import { useNavigation } from '@react-navigation/native'
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

const PAGE_SIZE = 10

export default function AllTransactions() {
  const { user } = useContext(GlobalContext)
  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(false)

  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [account, setAccount] = useState(allAccount.id)
  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false)

  const [page, setPage] = useState(1)
  const [isEndOfList, setEndOfList] = useState(false)

  const fetchAccounts = async () => {
    const accounts = (await directusInstance.request(
      readItems(ACCOUNT_KEY, {
        filter: {
          user_id: user?.id
        },
      }),
    )) as any

    setAccounts([
      allAccount,
      ...accounts.sort((a: Account, b: Account) =>
        a.name.localeCompare(b.name),
      ),
    ])
  }

  const fetchTransactions = async () => {
    setLoading(true)
    const response = (await directusInstance.request(
      readItems(TRANSACTION_KEY, {
        sort: ['-trading_date'],
        filter: {
          account_id: account,
        },
        limit: PAGE_SIZE, // Number of items to return
        offset: (page - 1) * PAGE_SIZE, // Number of items to skip
      }),
    )) as any

    if (response.length < PAGE_SIZE) setEndOfList(true)

    setTransactions(prev => [...prev, ...response])
    setLoading(false)
  }

  const fetchAllTransactions = async () => {
    setLoading(true)
    const response = (await directusInstance.request(
      readItems(TRANSACTION_KEY, {
        sort: ['-trading_date'],
        filter: {
          user_id: user?.id
        },
        limit: PAGE_SIZE, // Number of items to return
        offset: (page - 1) * PAGE_SIZE, // Number of items to skip
      }),
    )) as any

    if (response.length < PAGE_SIZE) setEndOfList(true)

    setTransactions(prev => [...prev, ...response])
    setLoading(false)
  }

  useEffect(() => {
    user.email && fetchAccounts()
  }, [])

  useEffect(() => {
    setTransactions([])
    setPage(1)
    setEndOfList(false)
  }, [account])
  useEffect(() => {
    if (account && !isEndOfList) {
      if (account === '-1') {
        fetchAllTransactions()
      } else {
        fetchTransactions()
      }
    }
  }, [account, page])

  return (
    <View className='flex-1 bg-blue-50 px-3 pb-3'>
      <TouchableWithoutFeedback
        onPress={() => setShowAccountsDropdown(true)}
        className='mb-2'>
        <View className='flex flex-row justify-start items-center'>
          <View className='flex items-center flex-row gap-2'>
            <Text className='text-lg'>Account: </Text>
            <Text className='font-bold text-base'>
              {accounts.find(i => i.id === account)?.name}
            </Text>
          </View>
          <Menu
            visible={showAccountsDropdown}
            onDismiss={() => setShowAccountsDropdown(false)}
            anchor={
              <Button>
                <Icon source='menu-down' color={'black'} size={20} />
              </Button>
            }>
            {accounts.map((account, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setAccount(account.id)
                  setShowAccountsDropdown(false)
                }}
                title={account.name}
              />
            ))}
          </Menu>
        </View>
      </TouchableWithoutFeedback>
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

import { readItems } from '@directus/sdk'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Button, Icon, IconButton, Menu, SegmentedButtons, Text } from 'react-native-paper'
import TransactionCard from '../../components/transaction/TransactionCard'
import {
  ACCOUNT_KEY,
  TRANSACTION_KEY,
} from '../../contants/schema-key.constant'
import { allAccount } from '../../contants/transaction/empty-account.constant'
import { filterItems } from '../../contants/transaction/filter-item'
import { GlobalContext } from '../../contexts/context'
import { directusInstance } from '../../services/directus'
import { Transaction as TTransaction } from '../../types/transaction'
import { formatVND } from '../../utils/money'
import { filterDates, getFirstDateFilter } from '../../utils/number'

export default function Transaction() {
  const { user, account, setAccount } = useContext(GlobalContext)
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [showAccountsDropdown, setShowAccountsDropdown] = useState(false)

  const [accounts, setAccounts] = useState<any[]>([])
  const [transactions, setTransactions] = useState<TTransaction[]>([])
  const [filter, setFilter] = useState(filterItems[0].value)
  const fetchTransactions = async () => {
    const response = (await directusInstance.request(
      readItems(TRANSACTION_KEY, {
        sort: ['-trading_date'],
        filter: {
          account_id: account.id == "-1" ? {
            user_id: user?.id
          } : account.id,
          trading_date: {
            _gte: getFirstDateFilter(filter),
            _lte: new Date()
          }
        },
      }),
    )) as any

    setTransactions(response)
  }


  const fetchAccounts = useCallback(async () => {
    const accounts = (await directusInstance.request(
      readItems(ACCOUNT_KEY, {
        filter: {
          user_id: user?.id
        },
      }),
    )) as any

    setAccounts([
      allAccount,
      ...accounts
    ])
  }, [])

  let totalSpending = 0,
    totalEarning = 0
  transactions.forEach(item =>
    item.type === 'expenses'
      ? (totalSpending += item.total)
      : (totalEarning += item.total),
  )

  useEffect(() => {
    if (isFocused && user.email) {
      fetchAccounts()
    }
  }, [isFocused])

  useEffect(() => {
    if (account) {
      fetchTransactions()
    }
  }, [account, filter])

  return (
    <SafeAreaView className='flex-1'>
      <View className='pt-4 pb-2 flex-row items-center border-b border-[#ccc] mx-4 flex justify-between'>
        <Text className='text-xl font-bold items-center align-middle'>Transactions Manager</Text>
        <View className='items-center '>
          <IconButton
            icon="plus"
            onPress={() => navigation.navigate('Transaction Info')}>
          </IconButton>
        </View>
      </View>
      <View className='flex-1 pt-2 pb-4 bg-[#fafafa] flex flex-col'>
        <ScrollView className='px-4'>
          <TouchableWithoutFeedback
            onPress={() => setShowAccountsDropdown(true)}
            className='mb-2'>
            <View className='flex flex-row justify-start items-center'>
              <View className='flex flex-row gap-2'>
                <Text className='font-bold text-base'>
                  {accounts.find(i => i.id === account.id)?.name}
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
                      setAccount(account)
                      setShowAccountsDropdown(false)
                    }}
                    title={account.name}
                  />
                ))}
              </Menu>
              <View className='flex-1 flex justify-end flex-row'>
                <Text className=''>
                  Total:{' '}
                  <Text className='font-bold text-base'>
                    {formatVND(
                      account.id === '-1'
                        ? accounts.reduce((acc, item) => acc + item.total, 0)
                        : accounts.find(item => item.id === account.id)?.total ||
                        0,
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <SegmentedButtons
            value={filter}
            onValueChange={setFilter}
            buttons={filterItems}
            density='small'
          />
          <View className='mt-4 items-center gap-x-3'>
            <Text className=''>
              {filterDates(filter)}
            </Text>

          </View>
          <View className='mt-4 flex flex-row items-center gap-x-3'>
            <Text className='text-xs text-[#7D8895] mt-1'>
              My Total Earnings:
            </Text>
            <Text className='font-bold text-xl text-green-700'>
              {formatVND(totalEarning)}
            </Text>
          </View>
          <View className='flex flex-row items-center gap-x-3'>
            <Text className='text-xs text-[#s7D8895] mt-1'>
              My Total Spending:
            </Text>
            <Text className='font-bold text-xl text-red-700'>
              {formatVND(totalSpending)}
            </Text>
          </View>
          <View className='mt-4'>
            <View className='flex mb-2 flex-row items-center justify-between'>
              <Text className='font-medium'>Recently expenses</Text>
              <Button onPress={() => navigation.navigate('All Transactions')}>
                See All {'>'}
              </Button>
            </View>
            <View className='w-full mt-1 flex flex-col'>
              {transactions
                .filter((transaction) => transaction.type == "expenses").length > 0 ? (
                transactions
                  .filter((transaction) => transaction.type == "expenses")
                  .slice(0, 3)
                  .map((transaction, index) => (
                    <TransactionCard key={index} {...transaction} />
                  ))
              ) : (
                <Text className='text-center text-gray-400 mb-2'>
                  The is no expenses here, create one now!
                </Text>
              )}
            </View>
          </View>
          <View className='mt-4'>
            <View className='flex mb-2 flex-row items-center justify-between'>
              <Text className='font-medium'>Recently income</Text>
              <Button onPress={() => navigation.navigate('All Transactions')}>
                See All {'>'}
              </Button>
            </View>
            <View className='w-full mt-1 flex flex-col'>
              {transactions
                .filter((transaction) => transaction.type == "income").length > 0 ? (
                transactions
                  .filter((transaction) => transaction.type == "income")
                  .slice(0, 3)
                  .map((transaction, index) => (
                    <TransactionCard key={index} {...transaction} />
                  ))
              ) : (
                <Text className='text-center text-gray-400 mb-2'>
                  The is no income here, create one now!
                </Text>
              )}
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import {
  Button,
  Card,
  Icon,
  IconButton,
  SegmentedButtons,
  Text,
} from 'react-native-paper'
import Header from '../../components/Header'
import { GlobalContext } from '../../contexts/context'
import TransactionCard from '../../components/transaction/TransactionCard'
import { directusInstance } from '../../services/directus'
import { readItems } from '@directus/sdk'

const filterItems = [
  {
    value: 'd',
    label: 'Day',
  },
  {
    value: 'w',
    label: 'Week',
  },
  {
    value: 'M',
    label: 'Month',
  },
  {
    value: 'y',
    label: 'Year',
  },
  {
    value: 'p',
    label: 'Perior',
  },
]

export const Transaction = () => {
  const { user } = useContext(GlobalContext)
  const navigation = useNavigation()

  const [selectedFilter, setSelectedFilter] = useState('d')
  const [expTransactions, setExpTransactions] = useState([])

  const createTransation = () => {
    navigation.navigate('Create Transaction' as never)
  }

  const total = 13500000 // fake data

  const isFocused = useIsFocused()
  useEffect(() => {
    ;(async () => {
      try {
        const res = await directusInstance.request(
          readItems('trasaction', {
            sort: ['-trading_date'],
            limit: 3,
            filter: {
              account_id: {
                user_id: {
                  email: {
                    _eq: user.email,
                  },
                },
              },
              type: { _eq: 'expenses' },
            },
          }),
        )
        console.log(res)
        setExpTransactions(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user, isFocused])

  function dayjs(trading_date: any) {
    throw new Error('Function not implemented.')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Transactions' onBack={() => {}} />
      <View className='flex-1 bg-[#fafafa] px-3 flex flex-col'>
        <SegmentedButtons
          value={selectedFilter}
          onValueChange={setSelectedFilter}
          buttons={filterItems}
          density='small'
          style={{ width: '100%' }}
        />
        <View className='mt-5'>
          <Text className='font-bold mb-2.5 text-2xl text-center'>
            {total}đ
          </Text>
          <Text className='text-xs text-[#7D8895] text-center'>
            My Total Earnings
          </Text>
        </View>
        <View className='p-3 space-y-1 flex-1'>
          <View className='flex flex-row justify-between'>
            <Text className='font-medium'>All My Expenses</Text>
            <Text>See All</Text>
          </View>
          <View className='w-full flex flex-col gap-4'>
          {expTransactions.map((tran:any) => <TransactionCard id={tran.id} name={tran.name} total={tran.total} trading_date={tran.trading_date} />)}
          </View>
        </View>
        <View className='p-3 space-y-1 flex-1'>
          <View className='flex flex-row justify-between'>
            <Text className='font-medium'>All My Income</Text>
            <Text>See All</Text>
          </View>
          <View className='w-full flex flex-col gap-4'>
            <Card className='w-full bg-white'>
              <Card.Title
                title='Rental Income'
                subtitle='14 July 2021'
                left={props => (
                  <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
                    <Icon size={32} source='home-outline' color='#a8bacd' />
                  </View>
                )}
                right={props => (
                  <Text variant='bodyLarge' className='mr-4 text-green-700'>
                    +6.500.000VND
                  </Text>
                )}
              />
            </Card>
            <Card className='w-full bg-white'>
              <Card.Title
                title='Rental Income'
                subtitle='14 July 2021'
                left={props => (
                  <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
                    <Icon size={32} source='home-outline' color='#a8bacd' />
                  </View>
                )}
                right={props => (
                  <Text variant='bodyLarge' className='mr-4 text-green-700'>
                    +6.500.000VND
                  </Text>
                )}
              />
            </Card>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

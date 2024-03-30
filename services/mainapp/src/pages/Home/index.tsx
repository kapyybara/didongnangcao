import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Touchable, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Button, Menu, Divider, Text, Icon, Card } from 'react-native-paper'
import { GlobalContext } from '../../contexts/context'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { directusInstance } from '../../services/directus'
import { readItems } from '@directus/sdk'
import dayjs from 'dayjs'
import TransactionCard from '../../components/transaction/TransactionCard'
import { ScrollView } from 'react-native-gesture-handler'
import { getAccountByName } from '../../controllers/account.controller'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [currentAccount, setCurrentAccount] = useState("Total")
  const [accounts, setAccounts] = useState([])
  const [total, setTotal] = useState(0)

  const { user } = useContext(GlobalContext)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    ; (async () => {
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
            },
          }),
        )
        setTransactions(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user, isFocused])

  useEffect(() => {
    if (currentAccount == "Total") setTotal(accounts.reduce((accumulator: any, account: any) => accumulator + account.total, 0))
    getAccountByName(currentAccount).then((result) => {
      setTotal(result[0].total)
    })
  }
    , [currentAccount, accounts])

  useEffect(() => {
    ; (async () => {
      const res = await directusInstance.request(
        readItems('account', {
          filter: {
            user_id: {
              email: {
                _eq: user.email,
              },
            },
          },
        }),
      )
      setAccounts(res)
    })()
  }, [])



  return (
    <View className='w-full container p-3 flex gap-6'>
      <View className='w-full'>
        <Text variant='headlineMedium' className=' text-gray-900'>
          Welcome,
        </Text>
        <Text variant='bodyLarge' className=' text-gray-900'>
          {user?.email}
        </Text>
      </View>
      <LinearGradient
        colors={['#8E5FD9', '#DDCDF6', '#BB9AF1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 5 }}
        className='rounded-md w-full  py-4 flex flex-col items-center pb-12 shadow-sm shadow-slate-900'>
        <TouchableOpacity onPress={openMenu} className='flex w-full rounded-md flex-row items-center justify-center mb-2'>
          <Text className=' text-white text-lg'>{currentAccount}</Text>
          <View className=' w-4'>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button >
                  <Icon source='menu-down' color={'black'} size={20} />
                </Button>
              }>
              <Menu.Item onPress={() => setCurrentAccount("Total")} title="Total" />
              {accounts.map((acc: any) => {
                return <Menu.Item onPress={() => setCurrentAccount(acc.name)} title={acc.name} />
              })}
            </Menu>
          </View>
        </TouchableOpacity>
        <Text variant='headlineMedium' className='text-white'>
          {total?.toLocaleString()} VND
        </Text>
      </LinearGradient>

      <View className='w-full flex flex-col items-start'>
        <View className='w-full flex flex-row items-center justify-between mb-4'>
          <Text variant='titleMedium' className=' text-black '>
            Easy Operations
          </Text>
          <Icon source='dots-vertical' color={'black'} size={20} />
        </View>
        <View className='w-full flex flex-row justify-around'>
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <View className='w-fit flex flex-col items-center gap-1'>
              <Card>
                <Card.Content>
                  <Icon source='account' size={24} />
                </Card.Content>
              </Card>
              <Text variant='bodyMedium'>Account</Text>
            </View>
          </TouchableOpacity>
          <View className='w-fit flex flex-col items-center gap-1'>
            <TouchableOpacity onPress={() => navigation.navigate('Create Transaction', { type: "expenses" })}>
              <Card>
                <Card.Content>
                  <Icon source='arrow-up' size={24} />
                </Card.Content>
              </Card>
              <Text variant='bodyMedium'  >Expenses</Text>
            </TouchableOpacity>
          </View>
          <View className='w-fit flex flex-col items-center gap-1'>
            <TouchableOpacity onPress={() => navigation.navigate('Create Transaction', { type: "income" })}>

              <Card>
                <Card.Content>
                  <Icon source='arrow-down' size={24} />
                </Card.Content>
              </Card>
              <Text variant='bodyMedium' >Income</Text>
            </TouchableOpacity>

          </View>
          <View className='w-fit flex flex-col items-center gap-1'>
            <Card>
              <Card.Content>
                <Icon source='file-document-outline' size={24} />
              </Card.Content>
            </Card>
            <Text variant='bodyMedium'>Account</Text>
          </View>
        </View>
      </View>

      <View className='w-full flex flex-col items-start'>
        <View className='w-full flex flex-row items-center justify-between mb-4'>
          <Text variant='titleMedium' className=' text-black '>
            Previous Transactions
          </Text>
          {/* <Icon source='chevron-right' color={'black'} size={20} /> */}
        </View>
        <View className='w-full flex flex-coljustify-around'>
          {transactions.map((tran: any) => <TransactionCard id={tran.id} name={tran.name} total={tran.total} trading_date={tran.trading_date} />)}
        </View>
      </View>
    </View>
  )
}

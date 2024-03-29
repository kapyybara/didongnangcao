import React, { useState, useEffect, useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { Button, Menu, Divider, Text, Icon, Card } from 'react-native-paper'
import { GlobalContext } from '../../contexts/context'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { directusInstance } from '../../services/directus'
import { readItems } from '@directus/sdk'
import dayjs from 'dayjs'

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [transactions, setTransactions] = useState([])

  const { user } = useContext(GlobalContext)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)
  const navigation = useNavigation()
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
            },
          }),
        )
        console.log(res)
        setTransactions(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user, isFocused])

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
        <View className='flex w-full rounded-md flex-row items-center justify-center mb-2'>
          <Text className=' text-white text-lg'>Total</Text>
          <View className=' w-4'>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  <Icon source='menu-down' color={'black'} size={20} />
                </Button>
              }>
              <Menu.Item onPress={() => {}} title='Item 1' />
              <Menu.Item onPress={() => {}} title='Item 2' />
              <Divider />
              <Menu.Item onPress={() => {}} title='Item 3' />
            </Menu>
          </View>
        </View>
        <Text variant='headlineMedium' className='text-white'>
          567.800.000 VND
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
            <Card>
              <Card.Content>
                <Icon source='arrow-up' size={24} />
              </Card.Content>
            </Card>
            <Text variant='bodyMedium'>Pay</Text>
          </View>
          <View className='w-fit flex flex-col items-center gap-1'>
            <Card>
              <Card.Content>
                <Icon source='arrow-down' size={24} />
              </Card.Content>
            </Card>
            <Text variant='bodyMedium'>Account</Text>
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
          <Icon source='chevron-right' color={'black'} size={20} />
        </View>
        <View className='w-full flex flex-col gap-4'>
          {transactions.map(tran => (
            <Card className='w-full' key={tran.id}>
              <Card.Title
                title={tran.name}
                subtitle={dayjs(tran.trading_date).format('d MMM YYYY')}
                left={props => (
                  <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
                    <Icon size={32} source='cash-multiple' />
                  </View>
                )}
                right={props => (
                  <Text variant='bodyLarge' className='mr-4 text-green-700'>
                    {tran.total?.toLocaleString()} VND
                  </Text>
                )}
              />
            </Card>
          ))}
        </View>
      </View>
    </View>
  )
}

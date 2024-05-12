import { useContext, useEffect, useMemo, useState } from 'react'
import { Avatar, Card, Icon, Text } from 'react-native-paper'
import { HeaderContext } from '../../contexts/header'
import { TouchableOpacity, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { directusInstance } from '../../services/directus'
import { readItems } from '@directus/sdk'
import { GlobalContext } from '../../contexts/context'

export default function AccountPage(props: any) {
  const { subfix, setSubfix } = useContext(HeaderContext)
  const [accounts, setAccounts] = useState([])
  const sum = useMemo(() => (accounts.reduce((accumulator, account: any) => accumulator + account.total, 0)) / 1000000
    , [accounts])

  const { user } = useContext(GlobalContext)

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setSubfix({
        icon: 'plus',
        onPress: () => {
          navigation.navigate('Account Info')
          setSubfix(null)
        }
      })
    }
  }, [props, isFocused])

  useEffect(() => {
    ; (async () => {
      const res = await directusInstance.request(
        readItems('account', {
          filter: {
            user_id: user.id
          },
        }),
      )
      setAccounts(res)
    })()
  }, [user, isFocused])

  return (
    <View className='w-full flex flex-col items-center  p-3 pt-6 gap-y-8'>
      <View className='w-full flex flex-col items-center gap-2'>
        <Text variant='titleMedium'>Totals</Text>
        <Text variant='headlineMedium'>vnđ {sum}M</Text>
      </View>
      <View className='w-full flex flex-row items-center justify-around'>
        <TouchableOpacity
          onPress={() => navigation.navigate('Transfer History')}>
          <View className='w-fit flex flex-col items-center gap-3'>
            <Card>
              <Card.Content>
                <Icon source='star' size={24} />
              </Card.Content>
            </Card>
            <Text variant='bodyMedium'>Transfer history</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Transfer New')}>
          <View className='w-fit flex flex-col items-center gap-3'>
            <Card>
              <Card.Content>
                <Icon source='plus' size={24} />
              </Card.Content>
            </Card>
            <Text variant='bodyMedium'>New transfer</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='w-full flex flex-col gap-4 '>
        {accounts.map((acc: any, index: number) => (
          <Card id={index.toString()} onPress={() => {
            navigation.navigate('Account Info', { ...acc, label: "Update" })
            setSubfix(null)
          }
          } >
            <View className='w-full flex flex-row justify-between p-3 items-center'>
              <View className='flex flex-row  gap-3 items-center'>
                <Avatar.Text
                  className='bg-[#D8D8D8]'
                  label={`${index}`}
                  size={46}></Avatar.Text>
                <Text variant='bodyLarge'>{acc.name}</Text>
              </View>
              <Text variant='bodyLarge'>{acc.total.toLocaleString()} đ</Text>
            </View>
          </Card>
        ))}
      </View>
    </View>
  )
}

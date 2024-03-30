import { useContext, useEffect, useState } from 'react'
import { Switch, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { directusInstance } from '../../services/directus'
import { createItems, updateItem } from '@directus/sdk'
import { GlobalContext } from '../../contexts/context'
import { SnackBarContext } from '../../hocs/SnackBar'
import { useNavigation } from '@react-navigation/native'

export default function AccountNew({ route }) {
  const [money, setMoney] = useState(0)
  const [name, setName] = useState('')
  const [include_in_balance, setIncludeInBalnace] = useState(false)
  const [buttonLabel , setButtonLabel] = useState("Add")

  const { user } = useContext(GlobalContext)
  const { setData } = useContext(SnackBarContext)

  const navigation = useNavigation()

  const buttonEnable = money && name !== ''

  const createOrUpdateAccount = async () => {
    if (route.params) {
      const res = await directusInstance.request(
        updateItem('account', route.params.id, {
          total: money,
          name,
          include_in_balance,
          user_id: {
            email: user.email,
          },
        }),
      )
      if (res) {
        setData({ text: 'Update account successful!' })
        navigation.goBack()
      }
    } else {
      const res = await directusInstance.request(
        createItems('account', {
          total: money,
          name,
          include_in_balance,
          user_id: {
            email: user.email,
          },
        }),
      )
      if (res) {
        setData({ text: 'Create account successful!' })
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    if (route.params) {
      const data = route.params
      setMoney(data.total)
      setName(data.name)
      setIncludeInBalnace(data.include_in_balance == 'true')
      setButtonLabel("Update")
    }
  }, [route])

  return (
    <View className='w-full flex flex-col p-3 gap-6'>
      <View className='w-full flex flex-row justify-center items-center gap-3'>
        <TextInput
          keyboardType='number-pad'
          mode='flat'
          className='w-[40%] bg-transparent'
          value={`${money}`}
          onChangeText={v => setMoney(+v)}
        />
        <Text variant='headlineMedium'>VND</Text>
      </View>
      <TextInput
        className='w-full'
        mode='outlined'
        label='Account name'
        value={name}
        onChangeText={setName}
      />
      <View className='w-full flex flex-row justify-between items-center'>
        <Text variant='bodyMedium'>Do not include in total balance {include_in_balance}</Text>
        <Switch
          value={include_in_balance}
          onValueChange={e => {setIncludeInBalnace(!include_in_balance)}}
        />
      </View>
      <Button
        mode='contained-tonal'
        className='w-full'
        onPress={createOrUpdateAccount}
        disabled={!buttonEnable}>
        {buttonLabel}
      </Button>
    </View>
  )
}

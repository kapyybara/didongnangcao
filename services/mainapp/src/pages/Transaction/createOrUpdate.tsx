import { useContext, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

import {
  createItems,
  deleteItem,
  readItem,
  readItems,
  updateItem,
} from '@directus/sdk'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Dialog,
  MD3Colors,
  Portal,
  SegmentedButtons,
  Text,
  TextInput,
} from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import DropDown from 'react-native-paper-dropdown'
import { GlobalContext } from '../../contexts/context'
import { SnackBarContext } from '../../hocs/SnackBar'
import { CategoryList, TransactionType } from '../../services/const'
import { directusInstance } from '../../services/directus'
import {
  ACCOUNT_KEY,
  TRANSACTION_KEY,
} from '../../contants/schema-key.constant'
import { Account } from '../../types/account'

export default function CreateTransaction(props: any) {
  const transactionId = useMemo(() => props.route?.params?.id, [])
  const mode = transactionId ? 'update' : 'create'

  const navigation = useNavigation()

  const [accounts, setAccounts] = useState<Account[]>([])
  const [accountsOptions, setAccountOptions] = useState([])
  const { user } = useContext(GlobalContext)
  const { setData } = useContext(SnackBarContext)

  const [oldData, setOldData] = useState({} as any)

  // Form data
  const [type, setType] = useState(TransactionType[0].value)
  const [name, setName] = useState('')
  const [money, setMoney] = useState(0)
  const [category, setCategory] = useState('')
  const [account, setAccount] = useState('')
  const [inputDate, setInputDate] = useState(undefined)
  const [description, setDescription] = useState('')

  const [showCategories, setShowCategories] = useState(false)
  const [showAccounts, setShowAccounts] = useState(false)
  const [visible, setVisible] = useState(false)

  const formReady = useMemo(
    () => name && money && category && account && inputDate,
    [money, category, inputDate],
  )

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  const createTransaction = async () => {
    try {
      await directusInstance.request(
        createItems(TRANSACTION_KEY, {
          name: name,
          type: type,
          total: money,
          trading_date: inputDate,
          description: description,
          category: category,
          account_id: account,
        } as any),
      )

      await directusInstance.request(
        updateItem(ACCOUNT_KEY, account, {
          total:
            (accounts.find(i => i.id === account) as any).total +
            (type === 'income' ? money : -money),
        }),
      )

      setData({ text: 'Create transaction successfully!' })
      navigation.goBack()
    } catch (e) {
      console.log('error when creating a new transaction: ', e)
    }
  }

  const updateTransaction = async () => {
    await directusInstance.request(
      updateItem(TRANSACTION_KEY, props.route?.params?.id, {
        type: type,
        total: money,
        trading_date: inputDate,
        description: description,
        category: category,
        account_id: account,
      }),
    )

    // update total of account
    if (oldData.account_id !== account) {
      await directusInstance.request(
        updateItem(ACCOUNT_KEY, oldData.account_id, {
          total:
            (accounts.find(i => i.id === oldData.account_id) as any).total +
            (oldData.type === 'income' ? -oldData.total : oldData.total),
        }),
      )

      await directusInstance.request(
        updateItem(ACCOUNT_KEY, account, {
          total:
            (accounts.find(i => i.id === account) as any).total +
            (type === 'income' ? money : -money),
        }),
      )
    } else {
      await directusInstance.request(
        updateItem(ACCOUNT_KEY, account, {
          total:
            (accounts.find(i => i.id === account) as any).total +
            (type === 'income' ? money : -money) -
            (oldData.type === 'income' ? oldData.total : -oldData.total),
        }),
      )
    }

    setData({ text: 'Create transaction successful!' })
    navigation.goBack()
  }

  const deleteTransaction = async () => {
    await directusInstance.request(
      deleteItem(TRANSACTION_KEY, props.route?.params?.id),
    )

    await directusInstance.request(
      updateItem(ACCOUNT_KEY, oldData.account_id, {
        total:
          (accounts.find(i => i.id === oldData.account_id) as any).total +
          (oldData.type === 'income' ? -oldData.total : oldData.total),
      }),
    )

    setData({ text: 'Create transaction successful!' })
    navigation.goBack()
  }

  useEffect(() => {
    if (user) {
      ;(async () => {
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
        setAccountOptions(
          (res as any).map((i: { name: any; id: any }) => ({
            label: i.name,
            value: i.id,
          })),
        )
        setAccounts(res as any)
      })()
    }
  }, [user])

  useEffect(() => {
    if (mode === 'update') {
      ;(async () => {
        const transactionData = await directusInstance.request(
          readItem(TRANSACTION_KEY, transactionId),
        )

        setName(transactionData.name)
        setType(transactionData.type)
        setCategory(transactionData.category)
        const dateData = new Date(transactionData.trading_date)
        setInputDate(dateData as any)
        setDescription(transactionData.description)
        setAccount(transactionData.account_id)
        setMoney(transactionData.total)

        setOldData(transactionData)
      })()
    }
  }, [transactionId])

  return (
    <View className='flex flex-1 flex-col justify-start p-3 gap-2'>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={TransactionType}
      />
      <View>
        <TextInput
          label='Name'
          value={name}
          onChangeText={value => setName(value)}
          mode='outlined'
        />
      </View>
      <View className='flex flex-row justify-around items-center'>
        <TextInput
          label='Money'
          mode='outlined'
          keyboardType='numeric'
          className='flex-1 mr-4 font-bold text-xl'
          value={money.toString()}
          onChangeText={e => {
            setMoney(+e)
          }}
        />
        <Text variant='bodyLarge'>VND</Text>
      </View>
      <View className=''>
        <DropDown
          label={'Category'}
          mode='outlined'
          setValue={setCategory}
          list={CategoryList}
          visible={showCategories}
          showDropDown={() => setShowCategories(true)}
          onDismiss={() => setShowCategories(false)}
          value={category}
        />
      </View>
      <View className=''>
        <DropDown
          label={'Account'}
          mode='outlined'
          setValue={setAccount}
          list={accountsOptions}
          visible={showAccounts}
          showDropDown={() => setShowAccounts(true)}
          onDismiss={() => setShowAccounts(false)}
          value={account}
        />
      </View>
      <View className='pt-8'>
        <DatePickerInput
          locale='en'
          label='Date'
          mode='outlined'
          value={inputDate}
          onChange={(d: any) => setInputDate(d)}
          inputMode='start'
        />
      </View>
      <View className='pt-8'>
        <TextInput
          label={'Description'}
          value={description}
          onChangeText={e => setDescription(e)}
          mode='outlined'
          multiline={true}
          numberOfLines={5}
        />
      </View>
      <View className='pt-4'>
        {transactionId ? (
          <>
            <Button
              mode='contained-tonal'
              onPress={updateTransaction}
              // disabled={!formReady}
              className='mb-4'>
              Update
            </Button>
            <Button
              mode='contained'
              buttonColor={MD3Colors.error50}
              onPress={showDialog}>
              Delete
            </Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Text variant='bodyMedium'>
                    Are you sure you want to delete this transaction ?
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    buttonColor={MD3Colors.error50}
                    textColor='#fff'
                    className='px-4'
                    onPress={deleteTransaction}>
                    Yes
                  </Button>
                  <Button
                    mode='contained'
                    className='px-4'
                    onPress={hideDialog}>
                    No
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        ) : (
          <Button
            mode='contained'
            onPress={createTransaction}
            disabled={!formReady}>
            Save
          </Button>
        )}
      </View>
    </View>
  )
}

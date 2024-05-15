import {
  Button,
  Card,
  SegmentedButtons,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { CategoryList, TransactionType } from '../../services/const';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DatePickerInput } from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';
import { directusInstance } from '../../services/directus';
import { createItem, readItems, updateItem } from '@directus/sdk';
import { GlobalContext } from '../../contexts/context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HeaderContext } from '../../contexts/header';

const CreateTransfer = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [description, setDescription] = useState('');
  const [money, setMoney] = useState('');

  const [accounts, setAccounts] = useState([])
  const { user } = useContext(GlobalContext)
  const isFocused = useIsFocused()
  const { subfix, setSubfix } = useContext(HeaderContext)

  useEffect(() => {
    (async () => {
      const accountsRes = await directusInstance.request(readItems('account', {
        filter: {
          user_id: user?.id
        }
      }))
      setAccounts(accountsRes || [])
    })()
  }, [])

  const navigation = useNavigation()

  const fromAccounts = useMemo(() => {
    return accounts.map(i => ({
      value: i.id,
      label: i.name
    }))
  }, [accounts])
  const toAccounts = useMemo(() => {
    return accounts.map(i => ({
      value: i.id,
      label: i.name
    })).filter(i => i.value != fromAccount)
  }, [accounts, fromAccount])

  const addTransfer = async () => {
    const data = {
      amount: money,
      from_acc: {
        id: fromAccount
      },
      to_acc: {
        id: toAccount
      },
      user_id: user?.id,
      description,
      date: new Date()
    }

    const fromAccountData = accounts.find(i => i.id == fromAccount)
    const toAccountData = accounts.find(i => i.id == toAccount)

    try {
      await directusInstance.request(createItem('transfer_history', data))
      navigation.goBack()
    } catch (error) {
      console.log(error)

    }
  }

  useEffect(()=>{
    setSubfix(null)
  },[])

  return (
    <ScrollView className="w-full h-full">
      <View className="flex w-full h-full gap-2 p-1 top-1">
        <View className='flex flex-row justify-around items-center'>
          <TextInput
            label={'Money'}
            value={money}
            onChangeText={e => setMoney(e)}
            mode={'outlined'}
            className='flex-1 mr-4 font-bold '
          />
          <Text variant='bodyLarge'>VND</Text>
        </View>
        <View>
          <DropDown
            label={'Transfer from account'}
            mode={'outlined'}
            setValue={setFromAccount}
            list={fromAccounts}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={fromAccount}
          />
        </View>
        <View>
          <DropDown
            label={'Transfer to account'}
            mode={'outlined'}
            setValue={setToAccount}
            list={toAccounts}
            visible={showDropDown2}
            showDropDown={() => setShowDropDown2(true)}
            onDismiss={() => setShowDropDown2(false)}
            value={toAccount}
          />
        </View>
        <TextInput
          label={'Comment'}
          value={description}
          onChangeText={e => setDescription(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <Button
          icon="plus"
          mode="contained"
          disabled={!(money && description && fromAccount !== '' && toAccount !== '')}
          onPress={addTransfer}>
          Add
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateTransfer;

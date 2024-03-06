import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  TextInput,
  SegmentedButtons,
  Button,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
import {GlobalContext} from '../../../contexts/context';
import DropDown from 'react-native-paper-dropdown';
import {CategoryList, TransactionType, UnitList} from '../../../services/const';
import {DatePickerInput} from 'react-native-paper-dates';
import {directusInstance} from '../../../services/directus';
import { readItems } from '@directus/sdk';

export const TransactionCreate = ({navigation}: any) => {
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState([]);
  const [money, setMoney] = useState(100000);
  const [type, setType] = useState('expenses');
  const [description, setDescription] = useState('');
  const [inputDate, setInputDate] = React.useState(undefined);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showAccountDropDown, setAccountShowDropDown] = useState(false);
  const [unit, setUnit] = useState<'VND' | '$'>('VND');

  const [accounts, setAccounts] = useState([]);

  const formReady = useMemo(
    () => money && category && inputDate,
    [money, category, inputDate],
  );

  const addTransaction = () => {
    console.log('data');
  };

  useEffect(() => {
    switch (unit) {
      case '$':
        setMoney(10);
        break;
      case 'VND':
        setMoney(100000);
        break;
    }
  }, [unit]);

  // useEffect(() => {
  //   async () => {
  //     await directusInstance.request(
  //       readItems('account', {
  //         filter: {
  //           user_id: {}
  //         }
  //       })
  //     );
  //   };
  // }, []);

  const unitRange = useMemo(() => (unit == '$' ? 10 : 100000), [unit]);

  const increaseMoney = () => {
    setMoney(money + unitRange);
  };

  const decreaseMoney = () => {
    if (money - unitRange < 0) setMoney(0);
    else setMoney(money - unitRange);
  };

  return (
    <View className="flex flex-1 flex-col justify-start p-3 gap-2">
      <View className="pt-2 flex flex-row justify-around items-center py-4">
        <IconButton
          mode="contained-tonal"
          icon="minus"
          iconColor={MD3Colors.tertiary50}
          size={20}
          onPress={decreaseMoney}
        />
        <TextInput
          label="Money"
          mode={'outlined'}
          onChangeText={e => setMoney(+e)}
          value={`${money}`}
          keyboardType="numeric"
          className="w-[50%]"
        />
        <IconButton
          mode="contained-tonal"
          icon="plus"
          iconColor={MD3Colors.tertiary50}
          size={20}
          onPress={increaseMoney}
        />
        <View className="w-fit mr-2">
          <Text variant="bodyLarge">VND</Text>
        </View>
      </View>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={TransactionType}
      />
      <View className="">
        <DropDown
          label={'Category'}
          mode={'outlined'}
          setValue={setCategory}
          list={CategoryList}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={category}
        />
      </View>
      <View className="">
        <DropDown
          label={'Account'}
          mode={'outlined'}
          setValue={setAccount}
          list={accounts}
          visible={showAccountDropDown}
          showDropDown={() => setAccountShowDropDown(true)}
          onDismiss={() => setAccountShowDropDown(false)}
          value={account}
        />
      </View>
      <View className="pt-8">
        <DatePickerInput
          locale="en"
          label="Birthdate"
          mode={'outlined'}
          value={inputDate}
          onChange={(d: any) => setInputDate(d)}
          inputMode="start"
        />
      </View>
      <View className="pt-8">
        <TextInput
          label={'Description'}
          value={description}
          onChangeText={e => setDescription(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
      </View>
      <View className="pt-4">
        <Button mode="contained" onPress={addTransaction} disabled={!formReady}>
          Save
        </Button>
      </View>
    </View>
  );
};

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
  Portal,
  Dialog,
} from 'react-native-paper';
import {GlobalContext} from '../../../contexts/context';
import DropDown from 'react-native-paper-dropdown';
import {CategoryList, TransactionType, UnitList} from '../../../services/const';
import {DatePickerInput} from 'react-native-paper-dates';
import {directusInstance} from '../../../services/directus';
import {
  createItems,
  deleteItem,
  readItem,
  readItems,
  updateItem,
} from '@directus/sdk';
import {SnackBarContext} from '../../../hocs/SnackBar';
import {useNavigation} from '@react-navigation/native';

export const TransactionCreate = (props: any) => {
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState([]);
  const [money, setMoney] = useState(100000);
  const [type, setType] = useState('expenses');
  const [description, setDescription] = useState('');
  const [inputDate, setInputDate] = React.useState(undefined);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showAccountDropDown, setAccountShowDropDown] = useState(false);
  const [unit, setUnit] = useState<'VND' | '$'>('VND');
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [accounts, setAccounts] = useState([]);

  const {user} = useContext(GlobalContext);
  const {setData} = useContext(SnackBarContext);

  const formReady = useMemo(
    () => money && category && inputDate,
    [money, category, inputDate],
  );
  const transactionId = useMemo(() => props.route?.params?.id, []);

  useEffect(() => {
    if (transactionId) {
      (async () => {
        const transactionData = await directusInstance.request(
          readItem('trasaction', transactionId),
        );
        console.log(transactionData);
        setType(transactionData.type);
        setCategory(transactionData.category);
        const dateData = new Date(transactionData.trading_date);
        setInputDate(dateData);
        setDescription(transactionData.description);
        setAccount(transactionData.account_id);
        setMoney(transactionData.total);
      })();
    }
  }, [transactionId]);

  const navigation = useNavigation();

  const addTransaction = async () => {
    const res =
      (await directusInstance.request(
        createItems('trasaction', {
          type: type,
          total: money,
          trading_date: inputDate,
          description: description,
          category: category,
          account_id: account,
        }),
      )) || [];
    if (res) {
      setData({text: 'Create transaction successful!'});
      navigation.goBack();
    }
  };

  const updateTransaction = async () => {
    const res =
      (await directusInstance.request(
        updateItem('trasaction', transactionId, {
          type: type,
          total: money,
          trading_date: inputDate,
          description: description,
          category: category,
          account_id: account,
        }),
      )) || [];
    if (res) {
      setData({text: 'Create transaction successful!'});
      navigation.goBack();
    }
  };

  const deleteTransaction = async () => {
    const res =
      (await directusInstance.request(
        deleteItem('trasaction', transactionId),
      )) || [];
    if (res) {
      setData({text: 'Create transaction successful!'});
      navigation.goBack();
    }
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

  useEffect(() => {
    if (user) {
      (async () => {
        const res =
          (await directusInstance.request(
            readItems('account', {
              filter: {
                user_id: {
                  email: {
                    _eq: user.email,
                  },
                },
              },
            }),
          )) || [];
        setAccounts(
          res.map(i => ({
            label: i.name,
            value: i.id,
          })),
        );
      })();
    }
  }, [user]);

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
        {transactionId ? (
          <>
            <Button
              mode="contained-tonal"
              onPress={updateTransaction}
              // disabled={!formReady}
              className="mb-4">
              Update
            </Button>
            <Button
              mode="contained"
              buttonColor={MD3Colors.error50}
              onPress={showDialog}>
              Delete
            </Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Are you sure you want to delete this transaction ?
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    buttonColor={MD3Colors.error50}
                    textColor="#fff"
                    className="px-4"
                    onPress={deleteTransaction}>
                    Yes
                  </Button>
                  <Button
                    mode="contained"
                    className="px-4"
                    onPress={hideDialog}>
                    No
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        ) : (
          <Button
            mode="contained"
            onPress={addTransaction}
            disabled={!formReady}>
            Save
          </Button>
        )}
      </View>
    </View>
  );
};

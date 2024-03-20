import {
  Button,
  Card,
  SegmentedButtons,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {CategoryList, TransactionType} from '../../services/const';
import {useState} from 'react';
import {DatePickerInput} from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';

const AddPayment = () => {
  const [type, setType] = useState('expenses');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [reminder, setReminder] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [inputDate, setInputDate] = useState(undefined);
  const [account, setAccount] = useState('');
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <ScrollView className="w-full h-full">
      <View className="flex w-full h-full gap-2 p-1 top-1">
        <View className="flex-row items-center justify-center p-5">
          <TextInput
            mode="flat"
            value={quantity}
            onChangeText={e => setQuantity(e)}
            className="w-48 h-12 text-lg bg-transparent border-b"
          />
          <Text className="ml-2">VND</Text>
        </View>
        <SegmentedButtons
          value={type}
          onValueChange={setType}
          buttons={TransactionType}
        />
        <TextInput
          className="h-14"
          label={'Name'}
          value={name}
          onChangeText={e => setName(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <View>
          <DropDown
            label={'Reminder frequency'}
            mode={'outlined'}
            setValue={setAccount}
            list={CategoryList}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={account}
          />
        </View>
        <DatePickerInput
          locale="en"
          label="From"
          mode={'outlined'}
          value={inputDate}
          onChange={(d: any) => setInputDate(d)}
          inputMode="start"
        />
        <DatePickerInput
          locale="en"
          label="To"
          mode={'outlined'}
          value={inputDate}
          onChange={(d: any) => setInputDate(d)}
          inputMode="start"
        />
        <View>
          <DropDown
            label={'Account'}
            mode={'outlined'}
            setValue={setAccount}
            list={CategoryList}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={account}
          />
        </View>
        <View>
          <DropDown
            label={'Category'}
            mode={'outlined'}
            setValue={setAccount}
            list={CategoryList}
            visible={showDropDown1}
            showDropDown={() => setShowDropDown1(true)}
            onDismiss={() => setShowDropDown1(false)}
            value={account}
          />
        </View>
        <TextInput
          label={'Description'}
          value={description}
          onChangeText={e => setDescription(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <View className="flex flex-row items-center justify-between">
          <Text variant="bodyMedium"> Add Automation</Text>
          <Switch></Switch>
        </View>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => console.log('Added')}>
          Add
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddPayment;

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

const CreateTransfer = () => {
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
        <View>
          <DropDown
            label={'Transfer from account'}
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
            label={'Transfer to account'}
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
            label={'Transfer amount'}
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
          <DatePickerInput
            locale="en"
            label="Date"
            mode={'outlined'}
            value={inputDate}
            onChange={(d: any) => setInputDate(d)}
            inputMode="start"
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
          onPress={() => console.log('Added')}>
          Add
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateTransfer;

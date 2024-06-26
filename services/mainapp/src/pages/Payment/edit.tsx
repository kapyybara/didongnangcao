import {
  Button,
  Card,
  SegmentedButtons,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {CategoryList, ReminderFrequencyList, TransactionType} from '../../services/const';
import {useContext, useEffect, useState} from 'react';
import {DatePickerInput} from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';
import { directusInstance } from '../../services/directus';
import { readItems } from '@directus/sdk';
import { GlobalContext } from '../../contexts/context';
import { createPayment, getPayment, updatePayment } from '../../controllers/payment.controller';
import { SnackBarContext } from '../../hocs/SnackBar';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

const EditPayment = (props:any) => {
  const [loading, setLoading]  = useState(false)
  const [type, setType] = useState('expenses');
  const [total, setTotal] = useState('');
  const [name, setName] = useState('');
  const [reminder, setReminder] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const {setData} = useContext(SnackBarContext);
  const [account, setAccount] = useState('');
  const [accounts, setAccounts] = useState([])
  const [addAutomation,setAddAutomation] =useState(false)
  const [showReminderFrequencyDropDown, setShowReminderFrequencyDropDown] = useState(false);
  const [showAccountDropDown, setShowAccountDropDown] = useState(false);
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
  const [description, setDescription] = useState('');
  const [category,setCategory] = useState("")
  const {user} =useContext(GlobalContext)
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const handleSwitchAddAutomation = (value)=>{
      console.log({addAutomation,value})
    setAddAutomation(!addAutomation)
  }

  const handleEditPayment = ()=>{
    (async ()=>{
      const res = await updatePayment(props.route?.params.id, type,name,Number(total),reminder,fromDate,toDate, category,description,addAutomation, account)
      if (res){
        setData({text: 'Update regular payment successful!'});
        navigation.goBack();
      }
    })()
  }


  useEffect(() => {
    if (user) {
      (async () => {
        const res =
          (await directusInstance.request(
            readItems('account', {
              filter: {
                user_id: user?.id
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
  }, [account , isFocused]);

  useEffect(()=>{
    setLoading(true)

    ;(async ()=>{
      const payment = await getPayment(props.route?.params.id)
      if (payment) {
        setName(payment.name)
        setTotal(payment.total.toString())
        setCategory(payment.category)
        setAccount(payment.account_id)
        setReminder(payment.cycle_day)
        setAddAutomation(payment.add_automation == 'true')
        setType(payment.type)
        setFromDate(new Date(payment.from))
        setToDate(new Date(payment.to))
        setDescription(payment.description)
      }else{
        setData({text: "Payment not exist!. Please try again"});
        navigation.goBack()
      }
      setLoading(false)
    })()
  },[])

  

  return loading ? <Loading/> : (
    <ScrollView className="w-full h-full p-3">
      <View className="flex w-full h-full gap-2  ">
        <View className="flex-row items-center justify-center p-5">
          <TextInput
            mode="flat"
            value={total}
            onChangeText={e => setTotal(e)}
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
            setValue={setReminder}
            list={ReminderFrequencyList}
            visible={showReminderFrequencyDropDown}
            showDropDown={() => setShowReminderFrequencyDropDown(true)}
            onDismiss={() => setShowReminderFrequencyDropDown(false)}
            value={reminder}
          />
        </View>
        <DatePickerInput
          locale="en"
          label="From"
          mode={'outlined'}
          value={fromDate}
          onChange={(d: any) => setFromDate(d)}
          inputMode="start"
        />
        <DatePickerInput
          locale="en"
          label="To"
          mode={'outlined'}
          value={toDate}
          onChange={(d: any) => setToDate(d)}
          inputMode="start"
        />
        <View>
          <DropDown
            label={'Account'}
            mode={'outlined'}
            setValue={setAccount}
            list={accounts}
            visible={showAccountDropDown}
            showDropDown={() => setShowAccountDropDown(true)}
            onDismiss={() => setShowAccountDropDown(false)}
            value={account}
          />
        </View>
        <View>
          <DropDown
            label={'Category'}
            mode={'outlined'}
            setValue={setCategory}
            list={CategoryList}
            visible={showCategoryDropDown}
            showDropDown={() => setShowCategoryDropDown(true)}
            onDismiss={() => setShowCategoryDropDown(false)}
            value={category}
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
          <Text variant="bodyMedium"> Add Automation {addAutomation}</Text>
          
          <Switch value={addAutomation} onValueChange={handleSwitchAddAutomation}></Switch>
        </View>
        <Button
          mode="contained"
          onPress={handleEditPayment}>
          Edit
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditPayment;

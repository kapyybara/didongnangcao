import {
  Card,
  Icon,
  IconButton,
  Paragraph,
  Switch,
  Text,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../../contexts/header';
import PaymentCard from '../../components/PaymentCard';

const RegularPayments = ({ props }: any) => {
  const { subfix, setSubfix } = useContext(HeaderContext)
  const navigation = useNavigation();
  const gotoAddPayment = () => {
    navigation.navigate('Add Payment');
    setSubfix(null)
  };
  const [payments,setPayments] = useState([])
  const isFocused = useIsFocused()
 
  useEffect(() => {
    if (isFocused) {
      setSubfix({
        icon: 'plus',
        onPress: gotoAddPayment
      })
    }
  }, [props, isFocused])

  useEffect(()=>{
    // TODO: get payment theo account
  },[])

  return (
    <ScrollView>
      <View className="flex w-full p-1">
        <View className="flex flex-col w-full gap-4">
        { payments.length >0 ? payments.map((payment: any) => <PaymentCard id={payment.id}  type={payment.type} name={payment.name} total={payment.total} add_automation={payment.add_automation} cycle_day={payment.cycle_day}/>)
          : <Text className='w-full h-16 justify-around text-center self-center'>You don't have any regular payment yet!</Text>  
        }
        </View>
      </View>
    </ScrollView>
  );
};

export default RegularPayments;

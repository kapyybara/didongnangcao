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
import { readItems } from '@directus/sdk';
import { directusInstance } from '../../services/directus';
import { GlobalContext } from '../../contexts/context';
import Loading from '../../components/Loading';
import { getAccountByName, getAccountsByEmail } from '../../controllers/account.controller';

const RegularPayments = ({ props }: any) => {
  const { subfix, setSubfix } = useContext(HeaderContext)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const { account, user } = useContext(GlobalContext)
  const gotoAddPayment = () => {
    navigation.navigate('Add Payment');
    setSubfix(null)
  };
  const [payments, setPayments] = useState([])
  const isFocused = useIsFocused()


  useEffect(() => {
    if (isFocused) {
      setSubfix({
        icon: 'plus',
        onPress: gotoAddPayment
      })
    }
  }, [])

  useEffect(() => {
    ; (async () => {
      try {
        const accounts = await getAccountsByEmail(user?.email)
        var res;
        if (account == "Total") {
          res = await directusInstance.request(
            readItems('payment', {
              filter: {
                account_id: {
                  _in: accounts.map((acc: any) => acc.id)
                }
              },
            }),
          )
        }
        else {
          res = await directusInstance.request(
            readItems('payment', {
              filter: {
                account_id: {
                  name: account
                }
              },
            }),
          )
        }
        console.log(res)
        setPayments(res)
      } catch (error) {
        // console.log(error)
      }
    })()
  }, [account, isFocused])

  return <ScrollView className='flex w-full p-3 '>
    <View className="flex flex-col w-full ">
      {payments.length > 0 ? payments.map((payment: any) => <PaymentCard id={payment.id} type={payment.type} name={payment.name} total={payment.total} add_automation={payment.add_automation == "true"} cycle_day={payment.cycle_day} />)
        : <Text className='w-full h-16 justify-around text-center self-center'>You don't have any regular payment yet!</Text>
      }
    </View>
  </ScrollView>
};

export default RegularPayments;

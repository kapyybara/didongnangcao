import {
  Button,
  TextInput,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useContext, useState } from 'react';
import { sendSupport } from '../../controllers/support.controller';
import { GlobalContext } from '../../contexts/context';
import { SnackBarContext } from '../../hocs/SnackBar';
import { useNavigation } from '@react-navigation/native';

const Support = () => {
  const navigation = useNavigation();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(GlobalContext)
  const { setData } = useContext(SnackBarContext)

  const checkInput = () => {
    if (subject == "" || message == "") {
      setData({ text: "Invalid data ! Please try again" })
      return false;
    }
    return true;
  }
  const send = () => {
    const isValid = checkInput();
    if (isValid) {
      (async () => {
        const res = await sendSupport(user.email, subject, message)
        if (res?.id != null) {
          setData({ text: "Issues have been reported . Please wait for the admin to be check!" })
          setSubject("")
          setMessage("")
          navigation.goBack(); 
        }
      })()
    }

  }


  return (
    <ScrollView className="w-full h-full">
      <View className="flex w-full h-full gap-2 p-1 top-1">
        <TextInput
          className="h-14"
          label={'Message subject'}
          value={subject}
          onChangeText={e => setSubject(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={2}
        />
        <TextInput
          label={'Issues'}
          value={message}
          onChangeText={e => setMessage(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={6}
        />
        <Button
          mode="contained"
          onPress={() => send()}>
          Send Issues
        </Button>
      </View>
    </ScrollView>
  );
};

export default Support;

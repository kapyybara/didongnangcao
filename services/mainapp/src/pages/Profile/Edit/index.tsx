import React, { useContext, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { GlobalContext } from '../../../contexts/context';
import { updateAppUser } from '../../../controllers/user.controller';
import DropDown from 'react-native-paper-dropdown';
import { GenderList } from '../../../services/const';
import { useNavigation } from '@react-navigation/native';
import { SnackBarContext } from '../../../hocs/SnackBar';

const EditProfile = () => {
  const { user } = useContext(GlobalContext)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const {setData} = useContext(SnackBarContext);
  const [gender, setGender] = useState('');
  const [showGenderDropDown, setShowGenderDropDown] = useState(false);
  const navigation = useNavigation()

  useEffect(() => {
    setFullName(user.full_name)
    setPhone(user.phone_number)
    setGender(user.gender)
  }, [])

  const handleUpdateProfile = () => {
    (async () => {
      const res = await updateAppUser({
        ...user,
        phone_number: phone,
        gender: gender,
        full_name: fullName,
      })
      if (res) {
        setData({ text: 'Update profile successful!' });
        navigation.goBack();
      }
    })()
  }
  return (
    <View className="w-full h-full p-3">
      <View className="flex gap-4">
        <View className="flex items-center justify-center">
          <Image
            source={require('../../../assets/avatar.png')}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-bold mt-4">{user.full_name}</Text>
          <Text className="text-gray-500">{user.email}</Text>
        </View>
        <TextInput
          className="h-14"
          label={'Full Name'}
          value={fullName}
          onChangeText={e => setFullName(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <TextInput
          className="h-14"
          label={'Phone Number'}
          value={phone}
          onChangeText={e => setPhone(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <View className="">
          <DropDown
            label={'Gender'}
            mode={'outlined'}
            setValue={setGender}
            list={GenderList}
            visible={showGenderDropDown}
            showDropDown={() => setShowGenderDropDown(true)}
            onDismiss={() => setShowGenderDropDown(false)}
            value={gender}
          />
        </View>
        <Button mode="contained" onPress={() => handleUpdateProfile()}>Submit</Button>
      </View>
    </View>
  );
};

export default EditProfile;



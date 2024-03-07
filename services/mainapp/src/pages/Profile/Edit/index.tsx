import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState('');
  return (
    <View className="w-full h-full p-3">
      <View className="flex gap-4">
        <View className="flex items-center justify-center">
          <Image
            source={require('../../../assets/avatar.png')}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-bold mt-4">DANG HUU GIAU</Text>
          <Text className="text-gray-500">20110636@student.hcmute.edu.vn</Text>
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
          label={'Email'}
          value={email}
          onChangeText={e => setEmail(e)}
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
        <TextInput
          className="h-14"
          label={'Genre'}
          value={genre}
          onChangeText={e => setGenre(e)}
          mode={'outlined'}
          multiline={true}
          numberOfLines={5}
        />
        <Button mode="contained">Submit</Button>
      </View>
    </View>
  );
};

export default EditProfile;

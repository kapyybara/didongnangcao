import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

import {signOut} from '../services/oauth';
export default function Home() {
  return (
    <View className="mt-8 px-2">
      <Button title="Signout" onPress={() => signOut()} />
    </View>
  );
}

import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';

import {
  Button,
  Menu,
  Divider,
  Text,
  Icon,
  Card,
} from 'react-native-paper';
import { GlobalContext } from '../../contexts/context';
import { useNavigation } from '@react-navigation/native';

export const  Transaction = ({}: any) => {

  const {user} = useContext(GlobalContext)

  const navigation = useNavigation()

  const createTransation = () => {
    navigation.navigate('Create Transaction');

  }

  return (
    <View className="w-full container p-3 flex gap-6">
      <View className="w-full">
        <Text variant="headlineMedium" className=" text-gray-900">
          Transaction
        </Text>

       <Button onPress={createTransation}>Creaet </Button>
      
      </View>
   
    </View>
  );
}

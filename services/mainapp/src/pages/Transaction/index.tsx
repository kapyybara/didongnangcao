import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';

import {Button, Menu, Divider, Text, Icon, Card} from 'react-native-paper';
import {GlobalContext} from '../../contexts/context';
import {useNavigation} from '@react-navigation/native';

export const Transaction = ({}: any) => {
  const {user} = useContext(GlobalContext);

  const navigation = useNavigation();

  const createTransation = () => {
    navigation.navigate('Create Transaction');
  };

  const updateTransation = (id: string) => {
    navigation.navigate('Create Transaction', {
      id,
    });
  };

  const total = 13500000 // fake data

        <Button onPress={createTransation}>Creaet </Button>
      <Button onPress={() => updateTransation('06c21af8-70f9-4c47-b6aa-9216a3dd7c3e')}>Update</Button>
      </View>
    </View>
  );
};

import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import Home from './Home';
import Profile from './Profile';
import { Transaction } from './Transaction';
import { TransactionCreate } from './Transaction/Create';

const MainApp = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {key: 'statistical', title: 'Statistical', focusedIcon: 'poll'},
    {key: 'transaction', title: 'Transaction', focusedIcon: 'history'},
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    statistical: Profile,
    transaction: Transaction,
    profile: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainApp;

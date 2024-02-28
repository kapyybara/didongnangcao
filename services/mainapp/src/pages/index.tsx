import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import Home from './Home';
import Profile from './Profile';

const MainApp = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {key: 'statistical', title: 'Statistical', focusedIcon: 'poll'},
    {key: 'another', title: 'Another', focusedIcon: 'history'},
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
    another: Profile,
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

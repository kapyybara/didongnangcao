import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const AuthHoc = ({children, user}: any) => {

  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
    }
  }, [user]);
  return <>{children}</>;
};

export default AuthHoc;

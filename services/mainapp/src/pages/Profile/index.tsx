import {Text, Button, Card, Icon} from 'react-native-paper';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { signOut } from '../../services/oauth';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/context';

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useContext(GlobalContext)


  const gotoEditProfile = () => {
    navigation.navigate('Edit Profile');
  };

  const gotoPrivacyPolicy = () => {
    navigation.navigate('Privacy Policy');
  };

  const gotoRegularPayments = () => {
    navigation.navigate('Regular Payments');
  };
  const gotoTransferHistory = () => {
    navigation.navigate('Transfer History');
  };
  const handleLogout = ()=>{
    (async ()=>{
      await signOut() 
      navigation.navigate("Login")
    })()
  }
  
  const goToAccounts = ()=>{
    navigation.navigate('Account');
  }
  const goToSupport = ()=>{
    navigation.navigate('Support');
  }
  const goToContactUs = ()=>{
    navigation.navigate('Contact Us');
  }

  return (
    <ScrollView className="flex-1 bg-white py-6">
      <View className="items-center justify-center flex-1">
        <Text variant='headlineLarge' className="m-4 font-bold">PROFILE</Text>
        <Image
          source={require('../../assets/avatar.png')}
          className="w-24 h-24 rounded-full"
        />
        <Text className="mt-4 text-xl font-bold">{user?.full_name}</Text>
        <Text className="text-gray-500">{user?.email}</Text>

        <Card className="w-11/12 px-4 my-3 bg-white">
          <Card.Content>
            <View className="flex items-start justify-start gap-4">
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-edit" />
                <Text
                  className="text-base text-black-500"
                  onPress={gotoEditProfile}>
                  Edit profile
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account" />
                <Text
                  className="text-base text-black-500"
                  onPress={goToAccounts}>
                  Accounts
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="content-paste" />
                <Text
                  className="text-base text-black-500"
                  onPress={gotoRegularPayments}>
                  Regular Payments
                </Text>
              </View>
            
            </View>
          </Card.Content>
        </Card>
        <Card className="w-11/12 px-4 my-5 bg-white">
          <Card.Content>
            <View className="flex items-start justify-start gap-4">
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="help" />
                <Text className="text-base text-black-500" onPress={goToSupport}>Help & Support</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="contacts" />
                <Text className="text-base text-black-500"
                  onPress={goToContactUs}
                >Contact us</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-settings" />
                <Text
                  className="text-base text-black-500"
                  onPress={gotoPrivacyPolicy}>
                  Privacy policy
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card className="w-11/12 px-4 my-5">
          <Card.Content>
                <Button onPress={()=> handleLogout()}> Logout </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Profile;

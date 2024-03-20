import {Text, Button, Card, Icon} from 'react-native-paper';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

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

  return (
    <View className="flex-1 bg-white">
      <View className="items-center justify-center flex-1">
        <Image
          source={require('../../assets/avatar.png')}
          className="w-24 h-24 rounded-full"
        />
        <Text className="mt-4 text-xl font-bold">DANG HUU GIAU</Text>
        <Text className="text-gray-500">20110636@student.hcmute.edu.vn</Text>

        <Card className="w-11/12 px-4 my-3">
          <Card.Content>
            <View className="flex items-start justify-start gap-4 mt-4">
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
                  onPress={gotoTransferHistory}>
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
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-settings" />
                <Text className="text-base text-black-500">Settings</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card className="w-11/12 px-4 my-5">
          <Card.Content>
            <View className="flex items-start justify-start gap-4 mt-4">
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="help" />
                <Text className="text-base text-black-500">Help & Support</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="contacts" />
                <Text className="text-base text-black-500">Contact us</Text>
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
      </View>
    </View>
  );
};

export default Profile;

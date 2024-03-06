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

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('../../assets/avatar.png')}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-bold mt-4">DANG HUU GIAU</Text>
        <Text className="text-gray-500">20110636@student.hcmute.edu.vn</Text>

        <Card className="w-11/12 px-4 my-3">
          <Card.Content>
            <View className="flex mt-4 gap-4 items-start justify-start">
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-edit" />
                <Text
                  className="text-black-500 text-base"
                  onPress={gotoEditProfile}>
                  Edit profile
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account" />
                <Text className="text-black-500 text-base">Accounts</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="content-paste" />
                <Text className="text-black-500 text-base">
                  Regular Payments
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-settings" />
                <Text className="text-black-500 text-base">Settings</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card className="w-11/12 px-4 my-5">
          <Card.Content>
            <View className="flex mt-4 gap-4 items-start justify-start">
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="help" />
                <Text className="text-black-500 text-base">Help & Support</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="contacts" />
                <Text className="text-black-500 text-base">Contact us</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Icon size={24} source="account-settings" />
                <Text
                  className="text-black-500 text-base"
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

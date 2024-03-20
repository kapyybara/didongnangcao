import {
  Card,
  Icon,
  IconButton,
  Paragraph,
  Switch,
  Text,
} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TimeTabs from '../../components/CustomDatetimeTabs';

const TransferHistory = () => {
  const navigation = useNavigation();
  const gotoCreateTransfer = () => {
    navigation.navigate('Create Transfer');
  };
  return (
    <ScrollView>
      <View className="flex w-full p-1">
        <TimeTabs />
        <View className="flex flex-col w-full gap-4">
          <View className="w-full p-2">
            <Text className="py-2 text-base font-bold">January 10, 2024</Text>
            <View className="flex gap-4">
              <Card>
                <Card.Title
                  title="Tp Bank"
                  subtitle="Tiền chuyển trọ"
                  left={props => (
                    <View className="flex items-center justify-center p-1 rounded-md bg-zinc-200">
                      <Icon size={32} source="home-outline" />
                    </View>
                  )}
                  right={props => (
                    <Text variant="bodyLarge" className="mr-4 text-green-700">
                      +6.500.000VND
                    </Text>
                  )}
                />
              </Card>
              <Card>
                <Card.Title
                  title="Momo"
                  subtitle="Chuyển"
                  left={props => (
                    <View className="flex items-center justify-center p-1 rounded-md bg-zinc-200">
                      <Icon size={32} source="home-outline" />
                    </View>
                  )}
                  right={props => (
                    <Text variant="bodyLarge" className="mr-4 text-green-700">
                      +6.500.000VND
                    </Text>
                  )}
                />
              </Card>
            </View>
          </View>
          <View className="w-full p-2">
            <Text className="py-2 text-base font-bold">January 10, 2024</Text>
            <View className="flex gap-4">
              <Card>
                <Card.Title
                  title="Tp Bank"
                  subtitle="Tiền chuyển trọ"
                  left={props => (
                    <View className="flex items-center justify-center p-1 rounded-md bg-zinc-200">
                      <Icon size={32} source="home-outline" />
                    </View>
                  )}
                  right={props => (
                    <Text variant="bodyLarge" className="mr-4 text-green-700">
                      +6.500.000VND
                    </Text>
                  )}
                />
              </Card>
              <Card>
                <Card.Title
                  title="Momo"
                  subtitle="Chuyển"
                  left={props => (
                    <View className="flex items-center justify-center p-1 rounded-md bg-zinc-200">
                      <Icon size={32} source="home-outline" />
                    </View>
                  )}
                  right={props => (
                    <Text variant="bodyLarge" className="mr-4 text-green-700">
                      +6.500.000VND
                    </Text>
                  )}
                />
              </Card>
            </View>
          </View>
        </View>
      </View>
      <IconButton
        icon="gamepad-down"
        iconColor={'green'}
        size={40}
        onPress={() => gotoCreateTransfer()}
      />
    </ScrollView>
  );
};

export default TransferHistory;

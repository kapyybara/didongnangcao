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

const RegularPayments = () => {
  const navigation = useNavigation();
  const gotoAddPayment = () => {
    navigation.navigate('Add Payment');
  };
  const gotoEditPayment = () => {
    navigation.navigate('Edit Payment');
  };
  return (
    <ScrollView>
      <View className="flex w-full p-1">
        <View className="flex flex-col w-full gap-4">
          <Card className="w-full p-2" onPress={gotoEditPayment}>
            <Card.Title
              title="Rental Income"
              subtitle="14 July 2021"
              right={props => (
                <View className="flex flex-row">
                  <Text variant="bodyLarge" className="mr-4 text-green-700">
                    +6.500.000VND
                  </Text>
                  <Switch value={true} color="green"></Switch>
                </View>
              )}
            />
          </Card>
          <Card className="w-full p-2">
            <Card.Title
              title="Rental Income"
              subtitle="14 July 2021"
              right={props => (
                <View className="flex flex-row">
                  <Text variant="bodyLarge" className="mr-4 text-green-700">
                    +6.500.000VND
                  </Text>
                  <Switch value={true} color="green"></Switch>
                </View>
              )}
            />
          </Card>
          <Card className="w-full p-2">
            <Card.Title
              title="Rental Income"
              subtitle="14 July 2021"
              right={props => (
                <View className="flex flex-row">
                  <Text variant="bodyLarge" className="mr-4 text-green-700">
                    +6.500.000VND
                  </Text>
                  <Switch value={true} color="green"></Switch>
                </View>
              )}
            />
          </Card>
        </View>
      </View>
      <IconButton
        icon="gamepad-down"
        iconColor={'green'}
        size={40}
        onPress={() => gotoAddPayment()}
      />
    </ScrollView>
  );
};

export default RegularPayments;

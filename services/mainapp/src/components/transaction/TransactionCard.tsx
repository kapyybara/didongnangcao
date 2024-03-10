import { View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'

export default function TransactionCard() {
  return (
    <Card className='w-full bg-white'>
      <Card.Title
        title='Rental Income'
        subtitle='14 July 2021'
        left={props => (
          <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
            <Icon size={32} source='home-outline' color='#a8bacd' />
          </View>
        )}
        right={props => (
          <Text variant='bodyLarge' className='mr-4 text-green-700'>
            +6.500.000VND
          </Text>
        )}
      />
    </Card>
  )
}

import dayjs from 'dayjs'
import { View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'

export type TransactionCardType = {
  id: string,
  name: string,
  total: string,
  trading_date: string
}

export default function TransactionCard(data: TransactionCardType) {
  return (
    <Card className='w-full' key={data.id}>
      <Card.Title
        title={data.name}
        subtitle={dayjs(data.trading_date).format('d MMM YYYY')}
        left={props => (
          <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
            <Icon size={32} source='cash-multiple' />
          </View>
        )}
        right={props => (
          <Text variant='bodyLarge' className='mr-4 text-green-700'>
            {data.total?.toLocaleString()} VND
          </Text>
        )}
      />
    </Card>
  )
}

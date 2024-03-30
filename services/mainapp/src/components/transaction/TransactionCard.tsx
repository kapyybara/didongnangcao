import dayjs from 'dayjs'
import { View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { CategoryIcon } from '../../contants'

export type TransactionCardType = {
  id: string,
  name: string,
  category: string, 
  total: string,
  trading_date: string,
  type: string
}

export default function TransactionCard(data: TransactionCardType) {
  return (
    <Card className='w-full mb-4' key={data.id}>
      <Card.Title
        title={data.name}
        subtitle={dayjs(data.trading_date).format('d MMM YYYY')}
        left={props => (
          <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
            <Icon size={32} source={CategoryIcon(data.category)} />
          </View>
        )}
        right={props => (
          <Text variant='bodyLarge' className={"mr-4 "+ (data.type=="expenses"? "text-red-700" :"text-green-700")}>
           {data.type=="expenses"? "-":""}{data.total?.toLocaleString()} VND
          </Text>
        )}
      />
    </Card>
  )
}

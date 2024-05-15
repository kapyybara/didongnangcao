import { Card, Icon, Text } from 'react-native-paper'
import { Transaction } from '../../types/transaction'
import { formatDate } from '../../utils/format/date'
import { View } from 'react-native'
import { CategoryIcon } from '../../contants'
import { useNavigation } from '@react-navigation/native'

type Props = Transaction

export default function TransactionCard({ ...transaction }: Props) {
  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Transaction Information', transaction)
  }

  return (
    <Card
      key={transaction.id}
      className='w-full bg-white mb-4'
      onPress={handlePress}>
      <Card.Title
        title={transaction.name}
        titleStyle={{ fontWeight: 'bold' }}
        subtitle={formatDate(transaction.trading_date)}
        subtitleStyle={{ color: '#888' }}
        left={() => (
          <View className=' bg-zinc-200 flex items-center justify-center p-1 rounded-md'>
            <Icon size={32} source={CategoryIcon(transaction.category)} />
          </View>
        )}
        right={() => (
          <Text
            variant='bodyLarge'
            className={`${
              transaction.type === 'expenses'
                ? 'text-red-600'
                : 'text-green-600'
            } mr-3 font-bold`}>
            {transaction.type === 'expenses' ? '-' : '+'}
            {transaction.total.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        )}
      />
    </Card>
  )
}

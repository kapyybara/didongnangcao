
import dayjs from 'dayjs'
import { Switch, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { CategoryIcon } from '../contants'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export type PaymentCardType = {
  id: string,
  name: string,
  total: number,
  cycle_day: number,
  type: string,
  add_automation : boolean
}

export default function PaymentCard(data: PaymentCardType) {
  const navigation = useNavigation()
  const [active , setActive] = useState(data.add_automation)

  const handleSwitchAddAutomation = ()=>{
    setActive(!active)
  }

  return (
    <Card className='w-full mb-4' key={data.id} onPress={()=>navigation.navigate("Edit Payment",data )}>
      <Card.Title
              title={data.name}
              subtitle={"Every "+ data.cycle_day+" days"}
              right={props => (
                <View className="flex flex-row">
                  <Text variant="bodyLarge" className="mr-4 text-green-700">
                   {data.type == "Expenses"? "-":""}{data.total}
                  </Text>
                  <Switch value={active} onValueChange={handleSwitchAddAutomation}></Switch>
                </View>
              )}
            />
    </Card>
  )
}

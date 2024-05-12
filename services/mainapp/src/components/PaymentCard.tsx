
import dayjs from 'dayjs'
import { Switch, View } from 'react-native'
import { Card, Icon, Text } from 'react-native-paper'
import { CategoryIcon } from '../contants'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

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
  return (  
    <Card className=' mb-4 px-2 mx-2' key={data.id} onPress={()=>navigation.navigate("Edit Payment",data )}>
      <Card.Title
              title={data.name}
              subtitle={"Every "+ data.cycle_day+" days"}
              right={props => (
                <View className="flex flex-row">
                  <Text variant="bodyLarge" className="mr-4 text-green-700">
                   {data.type == "Expenses"? "-":""}{data?.total?.toLocaleString()}VNĐ
                  </Text>
                  <Switch disabled={true} value={data?.add_automation} ></Switch>
                </View>
              )}
            />
    </Card>
  )
}

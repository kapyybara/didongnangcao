import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'
import { LineChart } from 'react-native-gifted-charts'
import { BarChart } from 'react-native-gifted-charts'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Icon, MD3Colors, ProgressBar, Text } from 'react-native-paper'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../contexts/context'
import { Account } from '../../types/account'
import {Transaction as TTransaction } from '../../types/transaction'
import { readItems } from '@directus/sdk'
import { TRANSACTION_KEY } from '../../contants/schema-key.constant'
import { directusInstance } from '../../services/directus'
import { formatVND } from '../../utils/money'
import { useIsFocused } from '@react-navigation/native'

export const Statistic = () => {
  const currentDate = dayjs()
  const formattedDate = currentDate.format('MMM YYYY')

  const {user} = useContext(GlobalContext)
  const isFocused = useIsFocused()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<TTransaction[]>([])

  let totalSpending = 0,
    totalEarning = 0
  transactions.forEach(item =>
    item.type === 'expenses'
      ? (totalSpending += item.total)
      : (totalEarning += item.total),
  )
  const fetchAllTransactions = async () => {
    const response = (await directusInstance.request(
      readItems(TRANSACTION_KEY, {
        sort: ['-trading_date'],
        filter: {
          user_id: {
            email: user.email,
          },
        },
      }),
    )) as any
    console.log(response)
    setTransactions(response)
  }

  useEffect(()=>{
    user.email && fetchAllTransactions()
  },[isFocused, user])

  const pieData = [
    { value: 54, color: '#177AD5', text: '54%' },
    { value: 40, color: '#79D2DE', text: '30%' },
    { value: 20, color: '#ED6665', text: '26%' },
  ]

  const expenseLine = transactions.filter(item => item.type === 'expenses').map(item => {
    return {
      value: item.total,
      dataPointText: item.total.toString()
    }
  })

  const incomeLine = transactions.filter(item => item.type === 'income').map(item => {
    return {
      value: item.total,
      dataPointText: item.total.toString()
    }
  })
  
  const lineData = [
    { value: 3000000, dataPointText: '30k' },
    { value: 400000, dataPointText: '100000' },
    { value: 300000, dataPointText: '300000' },
    { value: 900000, dataPointText: '200000' },
    { value: 500000, dataPointText: '500k' },
    { value: 600000, dataPointText: '600000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
    { value: 3000000, dataPointText: '200000' },
    { value: 400000, dataPointText: '100000' },
    { value: 300000, dataPointText: '300000' },
    { value: 900000, dataPointText: '200000' },
    { value: 500000, dataPointText: '500000' },
    { value: 600000, dataPointText: '600000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
    { value: 3000000, dataPointText: '200000' },
    { value: 400000, dataPointText: '100000' },
    { value: 300000, dataPointText: '300000' },
    { value: 900000, dataPointText: '200000' },
    { value: 500000, dataPointText: '500000' },
    { value: 600000, dataPointText: '600000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
    { value: 700000, dataPointText: '700000' },
    { value: 800000, dataPointText: '800000' },
  ]

  const lineData2 = [
    { value: 1000000, dataPointText: '200000' },
    { value: 200000, dataPointText: '100000' },
    { value: 100000, dataPointText: '300000' },
    { value: 100000, dataPointText: '200000' },
    { value: 100000, dataPointText: '500000' },
    { value: 100000, dataPointText: '600000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
    { value: 1000000, dataPointText: '200000' },
    { value: 100000, dataPointText: '100000' },
    { value: 100000, dataPointText: '300000' },
    { value: 100000, dataPointText: '200000' },
    { value: 100000, dataPointText: '500000' },
    { value: 100000, dataPointText: '600000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
    { value: 1000000, dataPointText: '200000' },
    { value: 100000, dataPointText: '100000' },
    { value: 100000, dataPointText: '300000' },
    { value: 100000, dataPointText: '200000' },
    { value: 100000, dataPointText: '500000' },
    { value: 100000, dataPointText: '600000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
    { value: 100000, dataPointText: '700000' },
    { value: 100000, dataPointText: '800000' },
  ]

  const data = [
    {
      value: 2500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jan',
    },
    { value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 3500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Feb',
    },
    { value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 4500,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Mar',
    },
    { value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 5200,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Apr',
    },
    { value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 3000,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'May',
    },
    { value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
  ]
  return (
    <ScrollView>
      <View className='mt-5'>
        <Text className='font-medium mb-2.5 text-xl text-center'>
          {formattedDate}
        </Text>
      </View>
      <View className='flex flex-row items-center justify-between mx-10 my-2'>
        <View>
          <Text className='mb-1 text-xl font-medium text-center'>{formatVND(totalSpending)}</Text>
          <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
            Expense
          </Text>
        </View>
        <View>
          <Text className='mb-1 text-xl font-medium text-center'>{formatVND(totalEarning)}</Text>
          <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
          Income
          </Text>
        </View>
      </View>
      <View>
        <View className='mx-5 my-1'>
          <Text className='font-medium my-2.5 text-xl text-center'>
            Income rate
          </Text>
          <ProgressBar
            progress={0.5}
            color={MD3Colors.primary70}
            className='h-6 rounded-xl'
          />
          <Text className='text-base font-medium text-center '>50M</Text>
          <Text className='text-base font-medium text-right'>Goal: 100M</Text>
        </View>
        <View className='m-5 rounded-xl bg-slate-100'>
          <Text className='font-medium my-2.5 text-xl text-center'>
            Total Success this Month
          </Text>
          <View className='mx-5'>
            <LineChart
              yAxisLabelWidth={0}
              isAnimated={true}
              dashWidth={0}
              data={lineData2}
              data2={lineData}
              height={250}
              showVerticalLines
              spacing={44}
              initialSpacing={0}
              color1='green'
              color2='red'
              textColor1='green'
              dataPointsHeight={6}
              dataPointsWidth={6}
              dataPointsColor1='blue'
              dataPointsColor2='red'
              textShiftY={0}
              textShiftX={0}
              xAxisType='none'
              yAxisThickness={0}
            />
          </View>
          <View className='flex flex-row items-center justify-between mx-10 my-1'>
            <View>
              <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
                Income:
              </Text>
            </View>
            <View>
              <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
                650000
              </Text>
            </View>
          </View>

          <View className='flex flex-row items-center justify-between mx-10 my-1'>
            <View>
              <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
                Expense:
              </Text>
            </View>
            <View>
              <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
                650000
              </Text>
            </View>
          </View>

          <View className='flex flex-row items-center justify-between mx-10 my-1'>
            <View>
              <Text className='mb-1 text-base font-medium text-center'>
                Save:
              </Text>
            </View>
            <View>
              <Text className='mb-1 text-base font-medium text-center text-sky-500'>
                650000
              </Text>
            </View>
          </View>
        </View>
        <View className='m-5 rounded-xl bg-slate-100'>
          <Text className='font-medium mb-2.5 text-lg text-end m-4 text-neutral-600'>
            Monthly
          </Text>
          <View className='items-center mx-5'>
            <PieChart
              donut
              textColor='black'
              textSize={18}
              showTextBackground
              data={pieData}
              innerRadius={90}
            />
          </View>
          <View className='flex flex-row w-[90%] gap-2 m-2 '>
            <View className='w-1/2 p-3 bg-white rounded-lg shadow-lg'>
              <View className='flex flex-row items-center gap-1'>
                <View
                  className='w-4 h-4 rounded-full '
                  style={{ backgroundColor: '#3498db' }}></View>
                <Text className='text-base font-semibold '>Shopping</Text>
              </View>
              <Text className='block text-lg text-gray-700 truncate'>đ 3M</Text>
              <Text className='block text-gray-700 truncate'>
                Chi tiêu hàng ngày
              </Text>
            </View>
            <View className='w-1/2 p-3 bg-white rounded-lg shadow-lg'>
              <View className='flex flex-row items-center gap-1'>
                <View
                  className='w-4 h-4 rounded-full '
                  style={{ backgroundColor: '#ED6665' }}></View>
                <Text className='text-base font-semibold '>Rentals</Text>
              </View>
              <Text className='block text-lg text-gray-700 truncate'>đ 3M</Text>
              <Text className='block text-gray-700 truncate'>Thuê nhà</Text>
            </View>
          </View>
        </View>

        <View className='m-5 rounded-xl bg-slate-100'>
          <Text className='font-medium mb-2.5 text-xl text-end'>Overview</Text>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <BarChart
              data={data}
              barWidth={16}
              initialSpacing={10}
              spacing={14}
              barBorderRadius={4}
              showGradient
              yAxisThickness={0}
              xAxisType={'dashed'}
              xAxisColor={'darkgray'}
              yAxisTextStyle={{ color: 'darkgray' }}
              stepValue={1000}
              maxValue={6000}
              noOfSections={6}
              labelWidth={40}
              xAxisLabelTextStyle={{ color: 'darkgray', textAlign: 'center' }}
              showLine
              lineConfig={{
                color: '#F29C6E',
                thickness: 3,
                curved: true,
                hideDataPoints: true,
                shiftY: 20,
                initialSpacing: -30,
              }}
            />
          </View>
        </View>
        <View className='mx-5 my-1'>
          <View className='flex gap-4 '>
            <Card>
              <Card.Title
                title='Tp Bank'
                subtitle='Tiền chuyển trọ'
                left={props => (
                  <View className='flex items-center justify-center p-1 rounded-md bg-zinc-200'>
                    <Icon size={32} source='home-outline' />
                  </View>
                )}
                right={props => (
                  <Text variant='bodyLarge' className='mr-4 text-green-700'>
                    +6.500.000VND
                  </Text>
                )}
              />
            </Card>
            <Card>
              <Card.Title
                title='Momo'
                subtitle='Chuyển'
                left={props => (
                  <View className='flex items-center justify-center p-1 rounded-md bg-zinc-200'>
                    <Icon size={32} source='home-outline' />
                  </View>
                )}
                right={props => (
                  <Text variant='bodyLarge' className='mr-4 text-green-700'>
                    +6.500.000VND
                  </Text>
                )}
              />
            </Card>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

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
import { Transaction as TTransaction } from '../../types/transaction'
import { readItems } from '@directus/sdk'
import { TRANSACTION_KEY } from '../../contants/schema-key.constant'
import { directusInstance } from '../../services/directus'
import { formatVND } from '../../utils/money'
import { useIsFocused } from '@react-navigation/native'

export const Statistic = () => {
  const currentDate = dayjs()
  const formattedDate = currentDate.format('MMM YYYY')

  const { user } = useContext(GlobalContext)
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
      }),
    )) as any

    setTransactions(response)
  }

  useEffect(() => {
    user.email && fetchAllTransactions()
  }, [isFocused, user])

  const expensePieData = transactions.filter(item => item.type === 'expenses')
  const result = expensePieData.reduce((acc: any, item) => {
    if (acc[item.category]) {
      acc[item.category] += item.total
    } else {
      acc[item.category] = item.total
    }
    return acc
  }, {})

  const formattedResult = Object.entries(result).map(([category, total]) => ({
    category,
    total,
  }))

  const colors = ['#177AD5', '#79D2DE', '#ED6665', '#FFCE56', '#4BC0C0']

  const pieExpenseData = formattedResult.map((item: any, index) => ({
    category: item.category,
    total: item.total,
    value: (item.total / totalSpending) * 100,
    color: colors[index % colors.length],
    text: `${((item.total / totalSpending) * 100).toFixed(2)}%`,
  }))

  const expenseLine = transactions.filter(
    item => item.type === 'expenses' && item.trading_date.includes('2024-05'),
  )

  const incomeLine = transactions.filter(item => item.type === 'income')

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Function to convert data into lineData format
  const convertToLineData = (data: any, year: number, month: number): any => {
    const daysInMonth = getDaysInMonth(year, month)
    const lineData: any = Array.from({ length: daysInMonth }, (_, i) => ({
      value: 0,
      dataPointText: '0',
    }))

    data.forEach((item: any) => {
      const date = new Date(item.trading_date)
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate() - 1 // getDate() returns 1-31, array index should be 0-30
        lineData[day].value += item.total
        lineData[day].dataPointText = `${lineData[day].value}`
      }
    })

    return lineData
  }

  const lineData = convertToLineData(
    expenseLine,
    currentDate.year(),
    currentDate.month(),
  )
  const lineData2 = convertToLineData(
    incomeLine,
    currentDate.year(),
    currentDate.month(),
  )

  const data = [
    {
      value: 0,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Jan',
    },
    { value: 0, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 0,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Feb',
    },
    { value: 0, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 0,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Mar',
    },
    { value: 0, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: 0,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'Apr',
    },
    { value: 0, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },

    {
      value: totalEarning,
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: 'May',
    },
    { value: totalSpending, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
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
          <Text className='mb-1 text-xl font-medium text-center'>
            {formatVND(totalSpending)}
          </Text>
          <Text className='mb-1 text-base font-medium text-center text-neutral-600'>
            Expense
          </Text>
        </View>
        <View>
          <Text className='mb-1 text-xl font-medium text-center'>
            {formatVND(totalEarning)}
          </Text>
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
            progress={totalEarning / 10000000}
            color={MD3Colors.primary70}
            className='h-6 rounded-xl'
          />
          <Text className='text-base font-medium text-center '>
            {formatVND(totalEarning)}
          </Text>
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
                {formatVND(totalEarning)}
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
                {formatVND(totalSpending)}
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
                {formatVND(totalEarning - totalSpending)}
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
              data={pieExpenseData}
              innerRadius={90}
            />
          </View>
          <View className='grid grid-cols-2 gap-4 w-[95%] m-2'>
            {pieExpenseData.map((item: any) => (
              <View className='p-3 bg-white rounded-lg shadow-lg '>
                <View className='flex flex-row items-center gap-1'>
                  <View
                    className='w-4 h-4 rounded-full '
                    style={{ backgroundColor: `${item.color}` }}></View>
                  <Text className='text-base font-semibold '>
                    {item.category}
                  </Text>
                </View>
                <Text className='block text-lg text-gray-700 truncate'>
                  {formatVND(item.total)}
                </Text>
              </View>
            ))}
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
              stepValue={100000}
              maxValue={1000000}
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
      </View>
    </ScrollView>
  )
}

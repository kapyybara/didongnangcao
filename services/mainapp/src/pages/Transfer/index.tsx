import {
  Card,
  Icon,
  IconButton,
  Paragraph,
  Switch,
  Text,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TimeTabs from '../../components/CustomDatetimeTabs';
import { useContext, useEffect, useState } from 'react';
import { directusInstance } from '../../services/directus';
import { readItems } from '@directus/sdk';
import { GlobalContext } from '../../contexts/context';
import dayjs from 'dayjs';

const TransferHistory = () => {
  const navigation = useNavigation();
  const [transfers, setTransfers] = useState([])
  const { user } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      const transfersData = await directusInstance.request(readItems('transfer_history', {
        filter: {
          user_id: user?.id
        },
        fields: ['*', "from_acc.*", "to_acc.*"]
      }))
      console.log(transfersData)
      const groupedData = {};

      // Lặp qua từng mục trong dữ liệu và nhóm chúng theo tháng
      transfersData.forEach(item => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        // Nếu chưa có mảng cho tháng đó, tạo mới
        if (!groupedData[key]) {
          groupedData[key] = [];
        }

        // Thêm mục vào mảng của tháng đó
        groupedData[key].push(item);
      });

      setTransfers(groupedData)
    })()

  }, [])

  return (
    <ScrollView>
      <View className="flex w-full p-1">
        <TimeTabs />
        <View className="flex flex-col w-full gap-4">
          {Object.keys(transfers).map((key) =>
            <View className="w-full p-2">
              <Text className="py-2 text-base font-bold">{dayjs(key).format('MMMM YYYY')}</Text>
              <View className="flex gap-4">
                {
                  transfers[key].map((i) =>
                    <Card>
                      <Card.Title
                        title={i.from_acc.name}
                        subtitle={`Transfer to ${i.to_acc.name}`}
                        left={props => (
                          <View className="flex items-center justify-center p-1 rounded-md bg-zinc-200">
                            <Icon size={32} source="home-outline" />
                          </View>
                        )}
                        right={props => (
                          <Text variant="bodyLarge" className="mr-4 text-green-700">
                            {i.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}VND
                          </Text>
                        )}
                      />
                    </Card>
                  )
                }
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferHistory;

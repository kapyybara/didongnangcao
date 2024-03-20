import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const TimeTabs = () => {
  const [activeTab, setActiveTab] = useState('year');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View>
      <View className="flex-row items-center justify-center w-full gap-4 py-2 ml-[1px]">
        <TouchableOpacity onPress={() => handleTabChange('date')}>
          <Text
            className={`text-base ${
              activeTab === 'date' ? 'underline' : 'font-normal'
            }`}>
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('week')}>
          <Text
            className={`text-base ${
              activeTab === 'week' ? 'underline' : 'font-normal'
            }`}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('month')}>
          <Text
            className={`text-base ${
              activeTab === 'month' ? 'underline' : 'font-normal'
            }`}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('year')}>
          <Text
            className={`text-base ${
              activeTab === 'year' ? 'underline' : 'font-normal'
            }`}>
            Year
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('period')}>
          <Text
            className={`text-base ${
              activeTab === 'period' ? 'underline' : 'font-normal'
            }`}>
            Period
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center justify-center w-full p-2 ml-[1px]">
        <Text className="text-lg font-bold">2024</Text>
      </View>
    </View>
  );
};

export default TimeTabs;

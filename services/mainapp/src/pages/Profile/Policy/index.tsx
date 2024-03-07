import {Paragraph, Text} from 'react-native-paper';
import {ScrollView, View} from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView>
      <View className="flex-1 bg-white w-full p-5">
        <View className="flex">
          <Text className="text-xl font-bold mt-4">
            Authorization and Access Control
          </Text>
          <Paragraph className="text-gray-500">
            Access to the money management application shall be granted based on
            job responsibilities and authorization levels determined by
            management. Users must authenticate themselves securely before
            accessing the application, using strong passwords or other
            multi-factor authentication methods. Access privileges shall be
            reviewed regularly and adjusted as necessary.
          </Paragraph>
        </View>
        <View className="flex">
          <Text className="text-xl font-bold mt-4">
            Data Security and Confidentiality
          </Text>
          <Paragraph className="text-gray-500">
            All financial data stored or transmitted through the app must be
            encrypted using industry-standard encryption protocols. Users are
            prohibited from sharing login credentials or sensitive financial
            information with unauthorized individuals. Access to sensitive
            financial information shall be restricted to authorized personnel
            only, and data shall be handled in compliance with applicable
            privacy laws.
          </Paragraph>
        </View>
        <View className="flex">
          <Text className="text-xl font-bold mt-4">
            Transaction Monitoring and Reporting
          </Text>
          <Paragraph className="text-gray-500">
            The app shall provide real-time monitoring and reporting
            functionalities to track financial transactions, budgets, and
            expenses. Users are responsible for accurately recording and
            categorizing transactions in the app to ensure the integrity of
            financial data. Any discrepancies or suspicious activities detected
            in financial transactions must be reported to the designated
            authorities immediately.
          </Paragraph>
        </View>
        <View className="flex">
          <Text className="text-xl font-bold mt-4">
            Compliance and Regulatory Requirements
          </Text>
          <Paragraph className="text-gray-500">
            The app shall comply with all relevant laws, regulations, and
            industry standards governing financial transactions and data
            security. Regular audits and assessments shall be conducted to
            ensure compliance with regulatory requirements and internal
            policies. Users must adhere to all applicable policies and
            procedures when using the app to manage financial resources.
          </Paragraph>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;

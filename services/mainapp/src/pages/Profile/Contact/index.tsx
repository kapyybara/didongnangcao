import {Paragraph, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';

const ContactUser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Thank you for your interest in Tiền Tệ! We are always ready to assist and answer any of your questions.
      </Text>
      <Text style={styles.text}>
        If you have any inquiries or need support, please contact us at: <Text style={styles.email}>support@tiente.vn</Text>.
      </Text>
      <Text style={styles.text}>
        We will get back to you as soon as possible.
      </Text>
      <Text style={styles.signature}>Best regards,{'\n'}The Tiền Tệ Team</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    textDecorationLine: 'underline',
  },
  signature: {
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default ContactUser;

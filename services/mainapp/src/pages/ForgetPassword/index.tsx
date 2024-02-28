import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Avatar, Text} from 'react-native-paper';
import { sendResetPasswordRequest } from '../../services/oauth';

const ForgetPassword = ({navigation}: any) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleForgetPassword = () => {
    sendResetPasswordRequest(email).then((result: string)=>{
        console.log(result)
        if (result == ""){
            setError("")
            navigation.navigate('Login')
        }
        else {
            setError(result)
        }
    })
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
    
      <Button mode="contained" onPress={handleForgetPassword} style={styles.button}>
        Send reset password request
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
  error : {
    color : 'red'
  }
});

export default ForgetPassword;

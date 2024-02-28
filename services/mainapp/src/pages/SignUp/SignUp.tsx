import React from "react";
import { Avatar, Button, Text, TextInput } from "react-native-paper"
import { signInUserPassword, signUpWithUserPassword } from "../../services/oauth";
import { StyleSheet, View } from "react-native";

const SignUpScreen = ({navigation}: any) => {
    const [email, setEmail] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleLogin = () => {
      signUpWithUserPassword(fullName,email, password).then(() => {
        navigation.push('Login')
      })
    };
  
    const goToSignIn = () => {
      navigation.navigate('Login');
    };

  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <TextInput
          mode="outlined"
          label="Full Name"
          placeholder="Enter your Full name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        /> 
       
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Enter your Pass"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Create new account
        </Button>
        <View style={styles.gotoSignIn}>
        <Text variant="bodyMedium">
            Already have account?{' '}
            <Text onPress={goToSignIn} style={styles.link}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      gap: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    input: {
      width: '100%',
    },
    button: {
      width: '100%',
    },
    loginWithTitle: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    loginWithLeft: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    loginWithGoogle: {
      backgroundColor: '#E3F4E1',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 12,
      width: '100%',
    },
    loginWithGoogleWrap: {
      width: '100%',
    },
    loginWithGoogleText: {
      lineHeight: 72,
      textAlignVertical: 'center',
    },
    or: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    orText: {
      color: '#000',
    },
    gotoSignIn: {
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    orline: {
      height: 1,
      backgroundColor: '',
      width: '45%',
    },
    link: {
      color: '#1573FE',
    },
  });

export default SignUpScreen
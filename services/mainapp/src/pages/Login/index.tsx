import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Avatar, Text } from 'react-native-paper';
import { signInUserPassword, signInWithGoogle } from '../../services/oauth';
import { realm } from '../../services/realm';
import { getProfile, saveProfile } from '../../storages/profile';
import { useEffect } from 'react';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = () => {
    signInUserPassword(email, password).then(() => {
      saveProfile(email,password).then(()=>{
        navigation.push('Home')
      })
    })
  };
  const goToForgetPass = () => {
    navigation.navigate('ForgetPassword');
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleSignInWithGooglePress = () => {
    signInWithGoogle();
  };


  useEffect(() => {
     getProfile().then((result)=>{
      if (result.length > 0 ){
        navigation.push('Home')
      }
     })
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Button
        mode="contained"
        contentStyle={styles.loginWithGoogle}
        style={styles.loginWithGoogleWrap}
        onPress={handleSignInWithGooglePress}
        icon={() => (
          <Avatar.Image
            style={styles.loginWithLeft}
            size={48}
            source={require('../../assets/google.png')}
          />
        )}
        textColor="#000">
        <Text variant="titleSmall" style={styles.loginWithGoogleText}>
          Login with Google
        </Text>
      </Button>
      <View style={styles.or}>
        <View style={styles.orline} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orline} />
      </View>
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
        Đăng nhập
      </Button>
      <View style={styles.gotoSignup}>
        <Text variant="bodyMedium">
          Don’t have account?{' '}
          <Text onPress={goToSignUp} style={styles.link}>
            Sign Up
          </Text>
        </Text>
        <Text onPress={goToForgetPass} variant="bodyMedium" style={styles.link}>
          Forget password
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
  gotoSignup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
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

export default Login;

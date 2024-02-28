import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {signOut} from '../../services/oauth';
export default function Home() {
  return (
    <View className="mt-8">
      <Button title="Signout" onPress={() => signOut()} />
    </View>
  );
}


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
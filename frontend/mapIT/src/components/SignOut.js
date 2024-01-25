import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignOut = () => {
    const navigator = useNavigation();
    useEffect(()=>{
        auth().signOut();
        navigator.navigate('Login');
    },[]);
  return (
    <></>
  )
}

export default SignOut
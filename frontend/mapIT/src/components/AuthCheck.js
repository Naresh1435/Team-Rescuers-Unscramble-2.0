import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import { getUser, verifyTokenUser } from '../api/userAPI';
import { useNavigation } from '@react-navigation/native';
import { navActions } from '../../store/slices/navSlice';
const AuthCheck = () => {
    const disptach = useDispatch();
    const AuthDataUpdate = async (user)=>{

        if(user) {
            console.log("User :", user);
            const checkAndGet = await verifyTokenUser(user.token);
            if(checkAndGet) {
                disptach(userActions.login({
                    user : {
                        email : user.email,
                        displayName : user.displayName
                    },
                    userID : checkAndGet.user?.key
                }));
            } else {
               disptach(navActions.setNav({
                screen : 'Register'
               }))
              
            }
            
        } else {
            disptach(userActions.logout());
        }
    }
    useEffect(()=>{
        auth().onAuthStateChanged(AuthDataUpdate);
    },[]);
  return (
    <View> 
    </View>
  )
}

export default AuthCheck

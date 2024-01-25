import { View, Text,useWindowDimensions, TouchableOpacity,ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import image from '../../public/Bg2.png';
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux';
// import { postUser } from '../api/queries';
import { userActions } from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import { navActions } from '../../store/slices/navSlice';
import { addDriverAccount } from '../api/userAPI';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
    const navigator = useNavigation();
    const [FName, setFName] = useState();
    const [LName, setLName] = useState();
    const [MobileNum, setMobileNum] = useState();
    const [TagId, setTagId] = useState();
    const user = auth().currentUser;
    const dispatch = useDispatch()
    const {width,height} = useWindowDimensions();
    const handleFName =(text)=> {
        setFName(text)
    };
    const handleLName =(text)=> {
        setLName(text)
    };
    const handleNum =(text)=> {
        setMobileNum(text)
    };
    const handleTagId =(text)=> {
        setTagId(text)
    };
    const handleRegister = async ()=>{
        const userData = {
            fname : FName,
            lname:LName,
            uid :user.uid,
            phone : MobileNum,
            email : user.email
        } 
        console.log(userData);
        const result = await addDriverAccount(userData);
        if(result) {
            dispatch(userActions.login(userData));
            navigator.navigate('Explore');
        } else {
            alert("Something went wrong!");
        }
        
    }
  return (
    <SafeAreaView>
        <View style={tw`h-full flex justify-center items-center bg-gray-900`}>
        {/* <View style={{flex:1, height:height}}>
        <ImageBackground source={image} style={{flex:1, justifyContent:'center', height:height}}>
        </ImageBackground>
    </View> */}
            <View style={tw` w-5/6 border border-gray-100 rounded-md ml-2 mr-2  px-3 py-5`}>
                    
                        <View style={tw`  rounded-md`}>
                            <Input style={tw`text-white`}
                            onChangeText={handleFName}
                            placeholder='First Name'
                            
                            />
                        </View>
                        <View style={tw` mt-4 rounded-md`}>
                            <Input style={tw`text-white`}
                            onChangeText={handleLName}
                            placeholder='Last Name'
                            
                            />
                        </View>
                    
                    <View style={tw` mt-4  rounded-md`}>
                            <Input  style={tw`text-white`}
                            onChangeText={handleNum}
                            placeholder='Mobile Number'
                            />
                    </View>
            </View>
            <TouchableOpacity style={tw`bg-blue-700 p-4 w-5/6 mt-5 rounded-lg `} onPress={handleRegister}>
                <Text style={tw`text-center text-white font-bold text-xl`}>Continue</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Register
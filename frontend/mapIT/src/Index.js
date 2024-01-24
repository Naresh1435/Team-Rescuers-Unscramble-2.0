import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import Home from './screens/Home';
import tw from 'tailwind-react-native-classnames';
import Navigation from './components/Navigation';

import Login from './screens/Login';
import Register from './screens/Register';
// import Booking from './Booking';
// import Wallet from './Wallet';
// import Profile from './Profile';
// import Register from './Register';
const Stack = createNativeStackNavigator();



const Index = () => {
    const [locationStatus, setLocationStatus] = useState(false);
    useEffect(()=>{
        const requestLocation = async () =>{
            if(Platform.OS === 'ios') {
                console.log('here')
              getCurrentLocationAccess();
            }
        }
        requestLocation();
        
            
    });
    const getCurrentLocationAccess = ()=>{
        try {
            Geolocation.getCurrentPosition((pos)=>{
                console.log(pos);
            });
            setLocationStatus(true);
        } catch {
            setLocationStatus(false)   
        }
        
    }
    const NavCon = ()=>{
        return (
        <NavigationContainer>
         <View style={tw`h-3/6 bg-gray-100`}>
         <View style={tw`h-full`}>
        <SafeAreaProvider>
            
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
            name='Home'
            component={Home}
            options={{
                headerShown:false
            }}
            />
            {/* <Stack.Screen 
            name='Booking'
            component={Booking}
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen 
            name='Wallet'
            component={Wallet}
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen 
            name='Profile'
            component={Profile}
            options={{
                headerShown:false
            }}
            /> */}
            <Stack.Screen name="Login"
                component={Login}
                options={{
                    headerShown : false
                }}
            />
            <Stack.Screen name="Register"
                component={Register}
                options={{
                    headerShown : false
                }}
            />
        </Stack.Navigator>
        </SafeAreaProvider>
            </View>

            <View style={tw`h-1/6 bg-gray-900 `}>
                <Navigation/>
            </View>
        </View>

    </NavigationContainer>
        )
    }
    const NotAccess = ()=>{
        return (
        <View>
            <Text> Without Location The app won't open </Text>
        </View>
        )
    }
  return (
    <View style={tw`h-full bg-white`}>
        <NavCon/>
    
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
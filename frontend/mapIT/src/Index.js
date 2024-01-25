import { Platform, StyleSheet, Text, View,useWindowDimensions,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import tw from 'tailwind-react-native-classnames';
import Navigation from './components/Navigation';
import image from '../public/bg.png';
import Login from './screens/Login';
import Register from './screens/Register';
import Explore from './screens/Explore';
import SignOut from './components/SignOut';

const Stack = createNativeStackNavigator();



const Index = () => {
    const [locationStatus, setLocationStatus] = useState(false);
    const {width,height} = useWindowDimensions();
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
        
         <View style={tw`h-5/6 bg-gray-900`}>
         <View style={tw`h-full`}>
        <SafeAreaProvider>
            
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen 
            name='Explore'
            component={Explore}
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name="SignOut"
                component={SignOut}
                options={{
                    headerShown : false
                }}
            />
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
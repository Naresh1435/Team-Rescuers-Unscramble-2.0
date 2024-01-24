import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Navigation from './components/Navigation';
import tw from 'tailwind-react-native-classnames';
import Index from './Index';
import Register from './screens/Register';
import AuthCheck from './components/AuthCheck';
const Stack = createNativeStackNavigator();
const ConditionalNav = ()=>{
    const navigation = useNavigation();
    const nav = useSelector(state=>state.nav);
    if(nav.isNav) {
        navigation.navigate('Register');
    }
    return <></>
}
const Auth = () => {
    
    const user = useSelector(state=>state.user);
    
  return (
    <View>
        {/* {
        !user.isLogin? */}
        <View style={tw`h-full`}>
        <NavigationContainer>
            <SafeAreaProvider>

                <Stack.Navigator initialRouteName='Login'>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown:false
                        }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{
                            headerShown:false
                        }}
                    />
                </Stack.Navigator>
            </SafeAreaProvider>
            <ConditionalNav/>
        </NavigationContainer>
        
        </View>
        {/* : 
        <Index/>
      } */}
    </View>
  )
}

export default Auth;

const styles = StyleSheet.create({})
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import ts from 'tailwind-react-native-classnames'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
    const navigator = useNavigation();
  return (
    <SafeAreaView>
        <View style={tw`mt-10 pt-2 bg-gray-900 h-full`}>
        <View style={tw`bg-white border-b border-white mb-2`}></View>
            <View style={tw`flex flex-row mx-5 justify-around`}>
                <TouchableOpacity  style={tw` flex flex-col items-center`} onPress={()=>navigator.navigate('Home')} >
                    <Icon name="explore"  color="#FFF" size={28}/>
                    <Text style={{color:"#fff", marginTop:5, fontWeight:700}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={tw` flex flex-col items-center`} onPress={()=>navigator.navigate('Booking')}>
                    <Icon name="library-add-check"  color="#FFF" size={28}/>
                    <Text style={{color:"#FFF", marginTop:5, fontWeight:700}}>Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={tw` flex flex-col items-center`} onPress={()=>navigator.navigate('Wallet')}>
                    <Icon name="account-balance-wallet"  color="#FFF" size={28}/>
                    <Text style={{color:"#FFF", marginTop:5, fontWeight:700}}>Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={tw` flex flex-col items-center`} onPress={()=>navigator.navigate('Profile')}>
                    <Icon name="account-circle"  color="#FFF" size={28}/>
                    <Text style={{color:"#FFF", marginTop:5, fontWeight:700}}>SignOut</Text>
                </TouchableOpacity>
            </View>
            
            
            
            
        </View>
    </SafeAreaView>
  )
}

export default Navigation;

const styles = StyleSheet.create({})
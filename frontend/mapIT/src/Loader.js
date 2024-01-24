import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
export default function Loader() {
    useEffect(()=>{
        auth().onAuthStateChanged(AuthDataUpdate);
    },[]);
    const ConditionalNav = ()=>{
        const navigation = useNavigation();
        const nav = useSelector(state=>state.nav);
        if(nav.isNav) {
            navigation.navigate('Register');
        }
        return <></>
    }
  return (
    <View>
        <View style={tw``}>
            <Text>Loading....</Text>
      </View>
      <ConditionalNav/>
    </View>
  )
}

const styles = StyleSheet.create({})
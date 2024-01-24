import { SafeAreaView,View } from "react-native-safe-area-context";
import React, { useEffect, useState } from 'react';
import { Platform } from "react-native";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import tw from "tailwind-react-native-classnames";
const  HomeScreen = ()=>{
  useEffect(()=>{
    const requestLocation = async () =>{
        if(Platform === "ios") {
          console.log('here')
            Geolocation.getCurrentPosition((pos)=>{
                console.log(pos);
            });
        }
    }
    requestLocation();
},[]);
    return (
        <SafeAreaView>
          <MapView
         style={tw`h-full`}
         initialRegion={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         />
    </SafeAreaView>
    )
}

export default HomeScreen
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect,useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { addEndTime, addStartTime, getDriverTasks, multipleCoords } from '../api/userAPI'
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation'
import auth from '@react-native-firebase/auth'
const Explore = () => {
    const [coords,setCoords] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const user = useSelector(store=>store.user);
    const [tasks,updateTasks] = useState([]);

    const getTasks = async ()=>{
       
        const tasksData = await getDriverTasks(user.userID);
        updateTasks(tasksData.data);
    }
    useEffect(()=>{
        getTasks();
        getCoords();
        const intervalId = setInterval(getCoords, 2000);
        return () => clearInterval(intervalId);
    },[refresh]);
   

    const getCoords = ()=>{
        const cords = Geolocation.getCurrentPosition((positions)=>{
            setCoords({
                lat : positions.coords.latitude,
                lon : positions.coords.longitude
            });
            setInitialRegion({
                latitude : positions.coords.latitude,
                longitude : positions.coords.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            })
            return positions.coords
        });
        return cords;
    }
    const Task = (task)=>{
        const handleStartPress = async()=>{
            const result = getCoords();
            console.log(result);
            const body = {
                uid : user.userID,
                taskID : task.id,
                lat : coords?.lat,
                lon : coords?.lon
            }
            console.log(body);
            const coords = addStartTime(body);
            setRefresh(!refresh);
    
        }
        const handleEndPress = async()=>{
            try {
                const body = {
                    uid : user.userID,
                    taskID : task.id,
                    lat : coords?.lat,
                    lon : coords?.lon
                }
                
                const coords = await addEndTime(body);
                setRefresh(!refresh);
            } catch(err) {
                console.log(err)
            }
        }
        const handleMultipleCoordsCall  = async()=>{
            const body = {
                uid : user.userID,
                taskID : task.id,
                lat : coords?.lat,
                lon : coords?.lon
            }
            const coords  = await multipleCoords(body);
        }
        return (
            <View key={task.id} style={tw`p-2 bg-white rounded-md w-5/6 mt-10 mx-auto `}>
                <Text style={tw`text-black`}> Task Name : {task.name}</Text>
                <Text style={tw`text-black`}> Task Destination : {task.destination}</Text>
                <Text style={tw`text-black`}> Task Amount : {task.amount}</Text>
                <View>
                    { task.status == false ?<TouchableOpacity onPress={handleStartPress}>
                        <View style={tw`p-2 bg-green-400 w-1/2 mx-auto  rounded-md mt-5`}>
                            <Text style={tw`text-center`}> Start </Text>
                        </View>
                    </TouchableOpacity> : task.status =="completed"?<TouchableOpacity >
                        <View style={tw`p-2 bg-green-400 w-1/2 mx-auto  rounded-md mt-5`}>
                            <Text style={tw`text-center`}> Completed </Text>
                        </View>
                    </TouchableOpacity> : <TouchableOpacity onPress={handleEndPress}>
                        <View style={tw`p-2 bg-red-400 w-1/2 mx-auto  rounded-md mt-5`}>
                            <Text style={tw`text-center`}> End </Text>
                        </View>
                    </TouchableOpacity>  }
                </View>
            </View>
        )
    }
  return (
    <View style={tw`bg-gray-900 h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`text-white text-2xl`}>MappIT</Text>
      </View>
      <View style={tw`h-1/2`}>
      <MapView style={tw`w-full h-full`} initialRegion={initialRegion} showsUserLocation={true}>
      {coords && (
            <Marker
              coordinate={{
                latitude: coords.lat,
                longitude: coords.lon,
              }}
              title="Your Location"
            />
          )}
      </MapView>
      </View>
      <View style={tw`flex justify-center `}>
        <View style={tw`mt-10 w-5/6 mx-auto rounded-md p-2    bg-white `}>
                <Text style={tw`text-xl`}>Current Tasks</Text>
        </View>
      </View>
      { tasks && tasks.map(Task)}
      
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({})
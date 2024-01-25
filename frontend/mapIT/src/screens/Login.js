import { Input } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
 SafeAreaView,
 StatusBar,
 StyleSheet,
 View,
 Text,
 Dimensions,
 TouchableOpacity,
 Image,
 ImageBackground,
 useWindowDimensions,
 Touchable,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import image from '../../public/bg.png';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { navActions } from '../../store/slices/navSlice';
import { getDriver, verifyTokenUser } from '../api/userAPI';
import { useNavigation } from '@react-navigation/native';
import { userActions } from '../../store/slices/userSlice';


GoogleSignin.configure({
    webClientId : '707300135811-gffi5njqahdcr00d33653jb62vunf27j.apps.googleusercontent.com',
    offlineAccess : true
});




const Login = () => {
    const navigator = useNavigation();
    const {width,height} = useWindowDimensions();
    const [email,setEmail] = useState(); 
    const dispatch = useDispatch();
        const [password,setPassword] = useState();
        const [toggle,setToggle] = useState(false);
    async function signInGoogle(){
        const {idToken} = await GoogleSignin.signIn();
        const authCredentials = auth.GoogleAuthProvider.credential(idToken);
        const result = await auth().signInWithCredential(authCredentials);
        
    }
    const handleEmail = (e)=>{
        setEmail(e);
    }
    const handlePassword = (e)=>{
        setPassword(e);
    }
    const handleSignIn = async ()=>{
        try {
            const result = await auth().signInWithEmailAndPassword(email, password);
            const data = await getDriver(result.user.uid);
            dispatch(userActions.login({
                uid : result.user.uid,
                email : result.user.email,
                fname : data.fname,
                lname : data.lname,
                phone : data.phone
            }));
            navigator.navigate('Home');
        } catch(error){
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use!')
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('That email address is invalid!');
            }
            console.error(error);
        };
    }
    const handleSignUp = async ()=>{
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password);
            navigator.navigate('Register');
        } catch(error){
            if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        };
    }
    const handleToggle = ()=>{
        setToggle(!toggle);
    }
    const updateAuth = async (user)=>{
        if(user) {
            const result = await getDriver(user.uid);
            console.log(result)
            if(result) {
                dispatch(userActions.login({
                    userData : {
                        fname : result.fname,
                        lname : result.lname,
                        phone : result.phone,
                        email : user.email, 
                    }, 
                    userID : user.uid, 
                }));
                navigator.navigate('Explore');
            } else {
                navigator.navigate('Register');
            }
            
        }
    }
    useEffect(()=>{
        auth().onAuthStateChanged(updateAuth);
    },[]);
 return (
  <SafeAreaView style={styles.safeArea}>
    {/* <View style={{flex:1, height:height}}>
        <ImageBackground source={image} style={{flex:1, justifyContent:'center', height:height}}>
        </ImageBackground>
    </View> */}
    <View style={tw`flex h-full bg-gray-900 justify-center items-center`}>
            <View style={tw`flex flex-col text-center`} >
                <View style={tw`justify-start`}>
                            <Text style={tw`text-center text-4xl text-white font-bold mb-2`}>MappIT</Text>
                </View>
                <View>
                    <View style={tw` p-4 flex flex-col `}>
                        <Input
                        style={tw`p-4 lowercase text-white`}
                        onChangeText={handleEmail}
                        placeholder='Email'
                        />
                        <Input
                        style={tw`p-4 text-white `}
                        onChangeText={handlePassword}
                        placeholder='Password'
                        />
                        {
                            toggle
                            ?<>
                            <TouchableOpacity style={tw`font-bold   p-2 border border-white rounded-md `} onPress={handleSignUp}>
                            <Text style={tw`text-red-400 text-center font-bold text-xl`}>Register</Text>
                        </TouchableOpacity>
                         <View style={tw`w-full mt-2`}>
                         <TouchableOpacity onPress={handleToggle}>
                             <Text style={tw`text-center text-white mt-2 w-full`}>Already have account? Login Now.</Text>
                         </TouchableOpacity>
                     </View>
                     </>
                            : <>
                            <TouchableOpacity style={tw`font-bold   p-2 bg-gray-200 rounded-md `} onPress={handleSignIn}>
                            <Text style={tw`text-red-400 text-center font-bold text-xl`}>Login</Text>
                        </TouchableOpacity>
                        <View style={tw`w-full mt-2`}>
                        <TouchableOpacity onPress={handleToggle}>
                            <Text style={tw`text-center text-white mt-2 w-full`}>Don't have account? Register Now.</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                        }
                       
                    </View>
                </View>
                    {/* <View style={tw`bg-white my-5 border-b border-white  `} >
                        
                    </View> */}
            {/*<View style={tw``}>
                <TouchableOpacity style={styles.googleButton} onPress={signInGoogle}>
                <Image
                style={styles.googleIcon}
                source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
                }}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>*/}
            </View>
        </View>
   <StatusBar barStyle="light-content" />
   
  
  </SafeAreaView>
 );
};
const styles = StyleSheet.create({
 safeArea: {
  backgroundColor: "#262b2f"
 },
 container: {
  height: Dimensions.get('window').height,
  backgroundColor: "#262b2f",
 },
 topContent: {
  
 },
 bottomContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
 },
 mainText: {
  fontSize: 40,
  color: "white",
 },
 googleButton: {
  backgroundColor: "white",
  borderRadius: 4,
  paddingHorizontal: 34,
  paddingVertical: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
 },
 googleButtonText: {
  marginLeft: 16,
  fontSize: 18,
  fontWeight: '600'
 },
 googleIcon: {
  height: 24,
  width: 24
 }
});
export default Login;
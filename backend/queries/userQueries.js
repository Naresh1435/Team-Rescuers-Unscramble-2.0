const {app,auth,admin, db} = require('../connection/firebase');
const {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} = require('firebase/auth');
const {ref,get,set, child} = require('firebase/database');

exports.loginQuery = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            console.log(result);
            return {auth : true, response : result}
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}

exports.signUpQuery = async (email,password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            console.log(result);
            return {auth : true, response : result}
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}

exports.verifyForMob = async(uuid) =>{
    try {
        const dbRef = ref(db);
        const data = get(child())
    } catch (err) {
        console.log('User Data not available', err);
        return {auth:false}
    }
}

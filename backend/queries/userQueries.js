const {app,auth,admin, db} = require('../connection/firebase');
const {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} = require('firebase/auth');
const {ref,get,set, child} = require('firebase/database');

exports.loginQuery = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef,`masters/${result.user.uid}`));
            if(snapshot.exists()) {
                return {auth : true, response : snapshot.val()}
            } else {
                return {auth : false}
            }
           
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}

exports.signUpQuery = async (email,password, userData) => {
    try {
        const result = await createUserWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            console.log(result);
            const dbRef = ref(db);
            await set(child(dbRef,`/masters/${result.user.uid}`),{...userData, email, wallet : 0.0, historyWallet : []});

            return {auth : true, response : result}
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}



exports.driverAddQuery = async(data)=>{
    try {
        const dbRef = ref(db);
        await set(child(dbRef,`drivers/${data.uid}`),{fname : data.fname, lname : data.lname, email : data.email, phone : data.phone, wallet : 0.0, history : [] });
        return true
    } catch(err) {
        console.error("Error in Adding Users");
        return fasle
    }
}

exports.getAllDriversQuery  = async()=>{
    try {
        const dbRef = ref(db);
        let snapshot = await get(child(dbRef , "drivers"));
        if(snapshot.exists()){
            return snapshot.val()
        } else {
            return false
        }
    } catch(err) {
        console.error("Error in getting drivers", err);
        return false;
    }
}

exports.getDriver  = async(id)=>{
    try {
        const dbRef = ref(db);
        let snapshot = await get(child(dbRef , `drivers/${id}`));
        if(snapshot.exists()){
            return snapshot.val()
        } else {
            return false
        }
    } catch(err) {
        console.error("Error in getting drivers", err);
        return false;
    }
}
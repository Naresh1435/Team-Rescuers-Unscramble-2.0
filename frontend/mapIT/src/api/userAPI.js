import axios from 'axios';

const BASE_URL = "http://localhost:3001/api/driver";

const config = {
    headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
    }
}

export const getUser = async (email)=>{
    try{
        const result = await axios.post(`${BASE_URL}/login/getUser/${email}`);
        console.log(result.data);
        return result.data;
    } catch (err) {
        console.error("Error in postUser:",err);
    }
}

export const getDriver = async (uid) =>{
   try {
        
        const result = await axios.get(`${BASE_URL}/auth?uid=${uid}`);
        if(result.data.res){
            console.log(result.data.authData);
            return result.data.authData
        } else {
            return false
        }
   } catch (err) {
        console.error("Error in Responding with API", err);
        return false
   }
}

export const getDriverTasks = async (uid) => {
    try {
        const result = await axios.get(`${BASE_URL}/tasks?uid=${uid}`);
        // console.log(result);
        return result.data
    } catch (err) {
        console.error('Error getting driver tasks', err);
    }
} 

export const addDriverAccount = async (data) =>{
    try {
        const result = await axios.post(`${BASE_URL}/auth`,data,config);
        if(result.data.res) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.log("Register Error: ", err);
        return false
    }
}

export const addStartTime = async(body) => {
    try {
        console.log(body);
        const result = await axios.post(`${BASE_URL}/coords/start`,body,config);
        if(result.data.res) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.log("Error in Adding Start Time : ", err);
        return false
    }
}

export const addEndTime = async(body) => {
    try {
        const result = await axios.post(`${BASE_URL}/coords/end`,body,config);
        if(result.data.res) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.log("Error in Adding end Time : ", err);
        return false
    }
}

export const multipleCoords = async(body)=>{
    try {
        const result = await axios.post(`${BASE_URL}/coords`,body,config);
        if(result.data.res) {
            return true
        } else {
            return false
        }
    } catch(err) {
        console.log("Error in Adding real Time : ", err);
        return false
    }
}

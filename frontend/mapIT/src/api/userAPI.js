import axios from 'axios';

const BASE_URL = "http://localhost:3001/api/driver";

export const getUser = async (email)=>{
    try{
        const result = await axios.post(`${BASE_URL}/login/getUser/${email}`);
        console.log(result.data);
        return result.data;
    } catch (err) {
        console.error("Error in postUser:",err);
    }
}

export const verifyTokenUser = async (token) =>{
   try {
        const config  = {
            headers : {
                Token : token
            }
        }
        const result = await axios.get(`${BASE_URL}/auth`,config);
        if(result.data.res){
            console.log(result.data.authData);
            return true
        } else {
            return false
        }
   } catch (err) {
        console.error("Error in Responding with API", err);
        return false
   }
}


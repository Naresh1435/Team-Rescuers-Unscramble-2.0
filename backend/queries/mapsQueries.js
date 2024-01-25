const axios = require('axios');

exports.ApiDistanceCalc = async(pos1,pos2)=>{
    try {
        const mapboxToken = "sk.eyJ1IjoibmFyZXNoLWRldiIsImEiOiJjbG9odTF3NWQxY21sMmxvMnUzdW5ubm05In0.2XDU9TyDZ66vcVrx6TME8g";
        let URL = `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${pos1.lon},${pos1.lat};${pos2.lon},${pos2.lat}?sources=1&annotations=distance,duration&access_token=${mapboxToken}`;
        const resData = await axios.get(URL);
        console.log(URL);
        console.log(resData.data);
        if(!resData || resData.data.code!= "Ok"){
            
        }
        let distance = parseFloat(resData.data.distances[0][0])/1000;
        let duration = parseFloat(resData.data.durations[0][0])/60;
        distance = String(Number(distance).toFixed(2)) + "kms";
        duration = String(Number(duration).toFixed(2)) + "mins";
        return distance;
    } catch(err) {
        return (false);
        console.log(err);
    }
}



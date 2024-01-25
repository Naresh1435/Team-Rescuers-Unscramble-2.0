const {ref,get,child,update,set} = require('firebase/database');
const {db} = require('../connection/firebase');
const { v4: uuidv4 } = require('uuid');
const { ApiDistanceCalc } = require('./mapsQueries');
exports.addTaskQuery = async (uuid,taskData)=>{
    try {
        const taskID = uuidv4();
        const dbRef = ref(db);
        console.log(uuid)
        await set(child(dbRef, `drivers/${uuid}/tasks/${taskID}`), {...taskData, status:false});
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

exports.getTaskQuery = async (uuid,taskID) => {
    try {
        const snapshot =await get(child(ref(db),`drivers/${uuid}/tasks/${taskID}`))
        if(snapshot.exists()) {
            return snapshot.val()
        } else {
            return false
        }
    } catch(err) {
        console.log("Error in getTask");
        return false
    }
}

exports.getTaskAllQuery = async (uuid) => {
    try {
        const snapshot = await get(child(ref(db),`drivers/${uuid}/tasks`));
        if(snapshot.exists()) {
            const drivers = snapshot.val()
            const outputArray = Object.keys(drivers).map(key => ({
                id: key,
                ...drivers[key]
              }));
              
              console.log(outputArray);
            return outputArray
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

exports.updateStartTime = async (uuid, taskID,coords) =>{
    try {
        const date = new Date();
        const startTime = date.getTime()
        console.log(coords);
        const newCoords = [{
         lat:0 ,lon:0 ,timeStamp : startTime
        }]
        await set(child(ref(db), `drivers/${uuid}/tasks/${taskID}/startTime`), startTime);
        await set(child(ref(db), `drivers/${uuid}/currentTask`), taskID);
        await set(child(ref(db), `drivers/${uuid}/tasks/${taskID}/status`), true);
        await set(child(ref(db), `drivers/${uuid}/status`), true);
        await set(ref(db, `coordinates/${taskID}`), newCoords);
        return true
    } catch(err) {
        console.log("Error in updating :", err);
        return false
    }
}

exports.updateEndTime = async (uuid, taskID, coords) =>{
    try {
        const date = new Date();
        const endTime = date.getTime();
        
        const snapshot = await get(child(ref(db),`coordinates/${taskID}`));
        if(snapshot.exists()){
            const coords = snapshot.val();
            const result = await ApiDistanceCalc(coords[0], coords);
            const startTime = coords[0].timestamp;
            let differMins = ((endTime - startTime)/1000)/60;
            if(!differMins) {
                differMins=0;
            } 
            console.log(result)
            await set(child(ref(db), `drivers/${uuid}/tasks/${taskID}/endTime`), endTime);
            await set(child(ref(db), `drivers/${uuid}/tasks/${taskID}/totalMins`), differMins);
            await set(child(ref(db), `drivers/${uuid}/currentTask`), null);
            await set(child(ref(db), `drivers/${uuid}/tasks/${taskID}/status`), 'completed');
            coords.push({...coords, timeStamp : endTime});
            await set(child(ref(db),`coordinates/${taskID}`),{coords : coords})

        } else {
            return false
        }

        return true
    } catch(err) {
        console.log("Error in updating :", err);
        return false
    }
}

exports.addTaskCoords = async (taskID, coords)=>{
    try {
        let coordsRef= ref(db, `coordinates/${taskID}/`);
        const previousCoords = await get(coordsRef);
        if(previousCoords.exists()) {
            let result = previousCoords.val();
            const prev = result[result.length - 1]
            if(prev.lat === coords.lat && prev.long == coords.long) {
                return true;
            } else {
                const currentDate = new Date();
                const currentTime = currentDate.getTime()
                const newCoords = {...coords, timeStamp, timeStamp : currentTime }
                result.push(newCoords);
                await update(ref(db,`coordinates/${taskID}/coords`),result);
                return true;
            }
        }
    } catch (err) {
        console.error(`Failed to add coordinates for the task ${taskID}:`, err);
        return false
    }
}


exports.getTaskCoords = async (taskID)=>{
    try {
        const coordsRef = ref(db,`coordinates/${taskID}`);
        const snapshot = await get(coordsRef);
        if(snapshot.exists()) {
            return snapshot.val().coords;
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
        return false
    }
}
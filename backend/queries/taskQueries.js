const {ref,get,child,update} = require('firebase/database');
const {db} = require('../connection/firebase');
const { v4: uuidv4 } = require('uuid');
exports.addTaskQuery = async (uuid,taskData)=>{
    try {
        const taskID = uuidv4();
        const dbRef = ref(db);
        await set(child(dbRef, `drivers/${uuid}/tasks/${taskID}`), taskData);
        return true;
    } catch(err) {
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
            return snapshot.val()
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

exports.updateStartTime = async (uuid, taskID) =>{
    try {
        const date = new Date();
        const startTime = date.getTime()
        await update(child(ref(db), `drivers/${uuid}/tasks/${taskID}/startTime`), startTime);
        await update(child(ref(db), `drivers/${uuid}/currentTask`), taskID);
        await update(child(ref(db), `drivers/${uuid}/active`), true);
        return true
    } catch(err) {
        console.log("Error in updating :", err);
        return false
    }
}

exports.updateEndTime = async (uuid, taskID) =>{
    try {
        const date = new Date();
        const endTime = date.getTime()
        await update(child(ref(db), `drivers/${uuid}/tasks/${taskID}/endTime`), startTime);
        await update(child(ref(db), `drivers/${uuid}/currentTask`), null);
        await update(child(ref(db), `drivers/${uuid}/active`), false);
        return true
    } catch(err) {
        console.log("Error in updating :", err);
        return false
    }
}

exports.addTaskCoords = async (taskID)



exports.getTaskCoords = async (taskID)=>{

}
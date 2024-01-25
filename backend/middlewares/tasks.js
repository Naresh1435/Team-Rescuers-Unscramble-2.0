const {addTaskCoords,addTaskQuery,getTaskAllQuery,getTaskCoords,getTaskQuery,updateEndTime,updateStartTime} = require('../queries/taskQueries');
const auth = require('firebase/auth');
exports.postTask = async (req,res)=>{
 try {
    const task = {
        ...req.body
    }
    const result = await addTaskQuery(req.body.uid,task);
    console.log(result);
    if(result) {
        res.send("Task Updated!");
    } else {
        res.send("Task Failed to updated!");

    }
 } catch(err) {
    console.log("Error in posting the task", err);
    res.status(501).json({res:false}); 
}
}

exports.getTask = async (req,res)=>{
    try {
        const result = await getTaskQuery(req.body.uid,req.body.taskID);
        if(result) {
            res.json({res:true, data : result});
        } else {
            res.json({res:false});
        }
    } catch(err) {
        console.error("Error in getting the task")
    }
}

exports.getAllTask = async (req,res)=>{
    try {
        const result = await getTaskAllQuery(req.query.uid);
        if(result) {
            res.json({res:true, data : result});
        } else {
            res.json({res:false});
        }
    } catch(err) {
        console.error("Error in getting all the task")
    }
}

exports.updateStartTimeRoute = async(req,res)=>{
    try {
        console.log("Req Body",req.body);
        const result = await updateStartTime(req.body.uid, req.body.taskID, {lat : req.body.lat, lon : req.body.lon});
        if(result) {
            res.json({res:true});
        } else {
            res.json({res:false})
        }
    } catch (err) {
        console.log("Error in updateTask");
        res.json({res:false})
    }
}
exports.updateEndTimeRoute = async(req,res)=>{
    try {
        const result = await updateEndTime(req.body.uid, req.body.taskID, {lat : req.body.lat, lon : req.body.lon});
        if(result) {
            res.json({res:true});
        } else {
            res.json({res:false})
        }
    } catch (err) {
        console.log("Error in updateTask");
        res.json({res:false});
    }
}


exports.postCoords = async(req,res)=>{
    try {
        const result = await addTaskCoords(req.body.taskID, {lat:req.body.lat, lon:req.body.lon});
        if(result) {
            res.json({res:true});
        } else {
            res.json({res:false});
        }
    } catch (err) {
        console.log('Error in postCoords',err);
    }
}

exports.getCoords = async (req,res)=>{
    try {
        const result = await getTaskCoords(req.body.taskID);
        if(result) {
            console.log(result);
            res.json({res:true,coords:result});
        } else {
            res.json({res:false});
        }
    } catch (err) {
        console.log("Error in getCoords");
        res.json({res:false});
    }
}
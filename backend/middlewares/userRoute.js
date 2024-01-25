const { loginQuery, signUpQuery, verifyForMob, driverAddQuery, getDriver, getAllDriversQuery } = require("../queries/userQueries");

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await loginQuery(email,password);
        if(result.auth) {
            res.redirect('/home');
        } else {
            res.status(401).json({res:true,auth:false});
        }
    } catch(err) {
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }   
}

exports.signUp = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const userData = {
            fname : req.body.fname,
            lname : req.body.lname,
            phone : req.body.phone
        }
        const result = await signUpQuery(email,password,userData);
        if(result.auth) {
            res.redirect('/home');
        } else {
            res.status(401).json({res:true,auth : false, msg:result.msg});
        }
    } catch(err) {
        return res.status(501).json({res:false,msg:"Something went wrong!"});
    } 
}

exports.driverVerify = async (req,res)=>{
    try {
        const id = req.query.uid;
        const result = await getDriver(id);
        console.log(result);
        if(result) {
            res.json({res:true,auth : true, authData : result});
        } else {
            res.status(401).json({res : false, msg : "Invalid User"});
        }
    } catch (err) {
        console.log("Error Authentication",err);
    }
}

exports.driverAdd = async (req,res)=>{
    try {
        const result = await driverAddQuery(req.body);
        res.json({res:true, auth : true});
    } catch(err) {
        res.status(501).json({res:false, msg : "Server Error"});
    }
}

exports.getAllDrivers = async ()=>{
    try {
        const drivers = await getAllDriversQuery();
        if (drivers) {
            res.json({res:true, users: drivers})
        }
    }  catch (err) {
        console.log("Error in getting All drivers", err);
        res.status(501).json({res:false, msg : "Server Error"});
    }  
}
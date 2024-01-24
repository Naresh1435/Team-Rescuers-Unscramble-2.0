const { loginQuery, signUpQuery, verifyForMob } = require("../queries/userQueries");

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await loginQuery(email,password);
        if(result.auth) {
            res.json({res:true,auth:true, authData: result.response});
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
            res.json({res:true,auth:true, authData: result.response});
        } else {
            res.status(401).json({res:true,auth : false, msg:result.msg});
        }
    } catch(err) {
        return res.status(501).json({res:false,msg:"Something went wrong!"});
    } 
}

exports.driverVerify = async (req,res)=>{
    try {
        const token = req.get("Token");
        console.log(token);
        const result = await verifyForMob(token);
        console.log(result);
        if(result.auth) {
            res.json({res:true,auth : true, authData : result.response});
        } else {
            res.json({res : false, msg : "Invalid Token"});
        }
    } catch (err) {
        console.log("Error Authentication",err);
    }
}
const {getWallet, debitFromWallet, addToWallet} = require('../queries/paymentQueries');
const razorpay = require('../connection/razorpay');
const {auth} = require('../connection/firebase');
exports.getWalletDetail = async (req,res)=>{
    try {
        const result = await getWallet(req.body.uid);
        if(result) {
            res.json({res:true, walllet : result});
        } else {
            res.json({})
        }
    } catch(err) {
        console.log("Error in getting the wallet", err);
        res.status(500).json({"error": "Internal Server Error"})
    }
}

exports.createOrder = async (req,res)=>{
    try {
        const amount = parseInt(req.params.amount)*100;
        const order = await razorpay.instance.orders.create({
            amount : parseInt(amount),
            currency: 'INR',
        });
    res.json({res:true, order_id : order.id});
    } catch (err) {
        console.log("Error in creating order ", err);
        res.json({res:false});
    }
}

exports.addFunds =  async (req,res)=>{
    try {
     const data = {
         uid : auth.currentUser.uid,
         wallet : req.params.amount,
         timestamp : Date.now()
     }
     const result = await addToWallet(data);
     if(result) {
         res.json({res:true});
     } else {
         res.json({res:false});
     }
    } catch (err) {
     console.log("Error in Adding to wallet", err);
    }
}

exports.debitFunds = async (req,res)=>{
    try {
        const result = await debitFromWallet(req.body.fID, req.body.tID ,amount);
        if(result) {
            res.json({res:true});
        } else {
            res.json({res:false});
        }
       } catch (err) {
        console.log("Error in Adding to wallet", err);
       }
}
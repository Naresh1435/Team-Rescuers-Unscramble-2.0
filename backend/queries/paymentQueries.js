const {ref,get,set,update,child} = require('firebase/database');
const {db} = require('../connection/firebase');

exports.addToWallet = async(data) => {
    try {
       let wallet = await getWallet(data.uid);
       console.log(wallet);
       if(wallet == null) {
           wallet=0
       }
       const newBalance = parseInt(wallet) + parseInt(data.wallet);
       const dbRef = ref(db);
       await update(child(dbRef,`masters/${data.uid}`),{wallet: newBalance});
       return true
    } catch(err) {
       console.log(err);
       return false;
    }
   }
   
   exports.debitFromWallet = async(fromID, toID, amount) =>{
       try {
           const fwallet = await getWallet(fromID);
           const tWallet = await getDriverWallet(toID);
           const fnewBalance = parseInt(fwallet) - parseInt(amount);
           const tnewBalance = parseInt(tWallet) + parseInt(amount);
           const dbRef = ref(db);
           await update(child(dbRef,`masters/${fromID}/wallet`),fnewBalance);
           await update(child(dbRef, `drivers/${toID}`));
           return true
        } catch(err) {
           console.log(err);
           return false;
        }
   }
   const getDriverWallet = async(id)=>{
    let walletRef= ref(db);
    console.log(id)
    const snapshot = await get(child(walletRef,`masters/${id}`));
    if(snapshot.exists()) {
        const {wallet} = snapshot.val()
        console.log(wallet);
        return  wallet
    } else {
        return null
    }
}
   const getWallet = async(id)=>{
       let walletRef= ref(db);
       console.log(id)
       const snapshot = await get(child(walletRef,`masters/${id}`));
       if(snapshot.exists()) {
           const {wallet} = snapshot.val()
           console.log(wallet);
           return  wallet
       } else {
           return null
       }
   }
   exports.getWallet = async(id)=>{
       let walletRef= ref(db);
       console.log(id)
       const snapshot = await get(child(walletRef,`masters/${id}`));
       if(snapshot.exists()) {
           let {wallet} = snapshot.val();
           if(wallet == null) {
               wallet=0;
           }
           console.log(wallet);
           return  wallet
       } else {
           
           return null
       }
   }
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getAuth} = require("firebase/auth");
const {getDatabase} = require("firebase/database");
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyDF2Q7tEHvEz-xYptuQruSXXSsLQnF2zLE",
  authDomain: "mapit-rescuers.firebaseapp.com",
  projectId: "mapit-rescuers",
  storageBucket: "mapit-rescuers.appspot.com",
  messagingSenderId: "535928795812",
  appId: "1:535928795812:web:20ecea7727b95b68b06c31",
  databaseURL : "https://mapit-rescuers-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const serviceAccount  = require('../mapit-rescuers-firebase-adminsdk-alaq2-bf1e3eb446.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mapit-rescuers-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const app = initializeApp(firebaseConfig);

const db  = getDatabase(app);

const auth = getAuth(app);



module.exports = {app,db,auth,admin};


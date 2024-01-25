require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const corsOrigin = require('cors'); 
const router = require('./middlewares/routes');
const driverRouter = require('./middlewares/driverRoutes');
const ejs = require('ejs');
const { login, signUp } = require('./middlewares/userRoute');
const { auth } = require('./connection/firebase');
const { createOrder } = require('./middlewares/wallet');
const { postTask } = require('./middlewares/tasks');
const { getAllDriversQuery } = require('./queries/userQueries');
const { getWallet } = require('./queries/paymentQueries');

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200
}

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(corsOrigin(corsOptions));

app.use('/api/admin',router);
app.use('/api/driver', driverRouter)

app.get('/test',(req,res)=>{
    res.send("API Working");
})

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/home', async (req,res)=>{
    const balance = await getWallet(auth.currentUser.uid);
    const driver = await getAllDriversQuery();
    console.log(driver)
    let completedTasks = 0;
    res.render('homepage', {UID : auth.currentUser.uid, wallet :balance });

});

app.get('/view', (req,res)=>{
    res.render('view');
});

app.get('/tasks',(req,res)=>{
    res.render('task');
});

app.get('/addmoney',(req,res)=>{
    res.render('addMoney');
});

app.post('/addmoney',createOrder);

app.get('/newTask',async (req,res)=>{
    const drivers = await getAllDriversQuery();
    const outputArray = Object.keys(drivers).map(key => ({
        id: key,
        ...drivers[key]
      }));
      
      console.log(outputArray);
    res.render('newTask', {drivers: outputArray});
});

app.post('/addTask', postTask)

app.post('/login',login);

app.post('/signup',signUp);

app.listen(process.env.PORT, (err)=>{
    if(err) {
        console.error('Unable to start server');
    } else {
        console.log(`Server Initiated at port ${process.env.PORT}`);
    }
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const corsOrigin = require('cors'); 
const router = require('./middlewares/routes');
const driverRouter = require('./middlewares/driverRoutes');


const app = express();

const corsOptions = {
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200
}

app.use(bodyParser.urlencoded({extended : false}));

app.use(corsOrigin(corsOptions));

app.use('/api/admin',router);
app.use('/api/driver', driverRouter)

app.get('/test',(req,res)=>{
    res.send("API Working");
})

app.listen(process.env.PORT, (err)=>{
    if(err) {
        console.error('Unable to start server');
    } else {
        console.log(`Server Initiated at port ${process.env.PORT}`);
    }
});

const { driverVerify } = require('./userRoute');

const driverRouter = require('express').Router();

driverRouter.route('/auth').get(driverVerify);


module.exports = driverRouter;
const { getAllTask, getTask, postCoords, updateStartTimeRoute, updateEndTimeRoute } = require('./tasks');
const { driverVerify, driverAdd, getAllDrivers } = require('./userRoute');

const driverRouter = require('express').Router();

driverRouter.route('/auth').get(driverVerify).post(driverAdd);
driverRouter.route('/getAll').get(getAllDrivers);
driverRouter.route('/tasks').get(getAllTask);
driverRouter.route('/task/one').get(getTask);
driverRouter.route('/coords').post(postCoords);
driverRouter.route('/coords/start').post(updateStartTimeRoute);
driverRouter.route('/coords/end').post(updateEndTimeRoute);


module.exports = driverRouter;
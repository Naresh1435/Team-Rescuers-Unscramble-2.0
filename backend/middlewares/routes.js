const { postTask, getCoords, getTask,getAllTask } = require('./tasks');
const { login, signUp } = require('./userRoute');
const { getWalletDetail, addFunds, createOrder } = require('./wallet');

const router = require('express').Router();

router.route('/login').post(login);
router.route('/signup').post(signUp);
router.route('/tasks').get(getAllTask).post(postTask)
router.route('/coords').get(getCoords);
router.route('/task/one').get(getTask);
router.route('/wallet').get(getWalletDetail).post(addFunds);
router.route('/orders/:amount').get(createOrder);
router.route('/wallet/:amount').get(addFunds)


module.exports = router;
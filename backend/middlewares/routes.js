const { login, signUp } = require('./userRoute');

const router = require('express').Router();

router.route('/login').post(login);
router.route('/signup').post(signUp);


module.exports = router;
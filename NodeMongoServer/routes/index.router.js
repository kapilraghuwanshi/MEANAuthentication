const express = require('express');
const router = express.Router(); // router level middleware function

const subscriberController = require('../controllers/subscriber.controller');
const jwtHelper = require('../config/JWT_Hepler');

console.log('inside router.js');

router.post('/register', subscriberController.register);
router.post('/authenticate', subscriberController.authenticate);
router.get('/subsProfile', jwtHelper.verifyJwtToken, subscriberController.subscriberProfile);

module.exports = router;
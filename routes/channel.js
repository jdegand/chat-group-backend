const express = require('express');
const router = express.Router();
const channelsController = require('../controllers/channelsController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(channelsController.getAllChannels)
    .post(verifyJWT, channelsController.createChannel)

router.route('/:id')
    .get(channelsController.getChannel)

// clean this up    
router.route('/channel/:id/user/:name/userId/:userId')
    .get(channelsController.getChannelIdWithUserName)
    .put(channelsController.updateChannel)

router.route('/name/:name')
    .get(channelsController.getChannelByName)

module.exports = router;

const express = require('express');
const router = express.Router({mergeParams: true});
const messagesController = require('../controllers/messagesController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(messagesController.getAllMessages)
    .post(verifyJWT, messagesController.createMessage)

module.exports = router;
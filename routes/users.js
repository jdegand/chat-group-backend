const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');
const multer = require('../middleware/multer');

//router.route('/')
//    .get(usersController.getAllUsers)

router.route('/:id')
    .get(verifyJWT, usersController.getUser)
    .post(verifyJWT, multer.send, usersController.updateUser);

module.exports = router;
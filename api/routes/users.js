const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/users')
const usercontroller = require('../controllers/users')

router.post('/signup', usercontroller.signup)

router.post('/login',usercontroller.login )

router.delete('/:userid', usercontroller.delete_user)

module.exports = router

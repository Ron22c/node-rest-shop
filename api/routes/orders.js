const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/orders')
const product = require('../models/products')
const Auth = require('../middleware/check_auth')
const ordercontroller = require('../controllers/orders')

router.get('/',Auth, ordercontroller.order_get_all)

router.post('/',Auth,ordercontroller.order_placeorder)

router.get('/:orderID',Auth,ordercontroller.order_getbyid)

router.delete('/:orderID',Auth, ordercontroller.order_delete)


module.exports = router

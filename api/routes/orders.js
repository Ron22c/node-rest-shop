const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.status(200).json({
    message: 'get from orders'
  })
})

router.post('/', function(req, res){
  let order = {
    orderId: req.body.orderid,
    quantity: req.body.quantity
  }
  res.status(200).json({
    message: 'post from orders',
    orderdetails: order
  })
})

router.get('/:orderID', function(req, res){
  res.status(200).json({
    message: 'get from orders'+ req.params.orderID
  })
})

router.delete('/', function(req, res){
  res.status(200).json({
    message: 'delete from orders'
  })
})

router.delete('/:orderID', function(req, res){
  res.status(200).json({
    message: 'delete from orders'+ req.params.orderID
  })
})


module.exports = router

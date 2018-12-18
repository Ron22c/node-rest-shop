 const express = require('express')
 const router = express.Router()

 router.get('/', function(req, res, next){
   res.status(200).json({
     message: 'get request from products route'
   })
 })

 router.post('/', function(req, res, next){
   let product = {
     name: req.body.name,
     price: req.body.price
   }
   res.status(200).json({
     message: 'post request from products route',
     createProduct: product
   })
 })

 router.get('/:productID', function(req, res, next){
   let ID = req.params.productID
   if(ID === 'special'){
     res.status(200).json({
       message: 'you have discovered a special product',
       id: ID,
     })
   }
   else{
     res.status(200).json({
       message: 'you put an normal ID',
       id: ID
     })
   }
 })

 router.patch('/', function(req, res, next){
   res.status(200).json({
     message: 'patch request from products route'
   })
 })

 router.delete('/', function(req, res, next){
   res.status(200).json({
     message: 'delete request from products route'
   })
 })

 module.exports = router

 const express = require('express')
 const mongoose = require('mongoose')
 const Product = require('../models/products')
 const router = express.Router()



 router.get('/', function(req, res, next){
   Product.find().
   exec().
   then(function(alldata){
     console.log(alldata);
     res.status(200).json(alldata)

   }).catch(function(error){
     console.log(error);
     res.statuc(500).json({
         error: err
       })
   })
 })

 router.post('/', function(req, res, next){
   const product = new Product({
     _id : mongoose.Types.ObjectId(),
     name: req.body.name,
     price: req.body.price
   })
   product.save().then(function (result){
     console.log(result);
     res.status(201).json({
       message: 'post request from products route',
       products: result
     })
   }).catch(function error(){
     console.log('error');
     res.status(500).json({
       message: 'error'
     })

   })
 })

 router.get('/:productID', function(req, res, next){
   const ID = req.params.productID
   Product.findById(ID).
   exec().
   then( function(data)  {
     console.log(data);
     res.status(200).json({
       dataone : data,
       id: req.params
     })
   }).
   catch(function(error) {
     console.log(error);
     res.status(500).json({
       error: error
     })
   })
 })


 router.patch('/', function(req, res, next){
   res.status(200).json({
     message: 'patch request from products route'
   })
 })

 router.delete('/:id', function(req, res, next){
   const ID = req.params.id
   Product.remove({_id : ID}).
   exec().
   then(function(result){
     console.log(result);
     res.status(200).json(result)
   }).
   catch(function(error){
     console.log(error);
     res.status(500).json({
       error: err
     })
   })
 })

 module.exports = router

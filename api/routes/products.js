 const express = require('express')
 const mongoose = require('mongoose')
 const multer = require('multer')
 const Product = require('../models/products')
 const router = express.Router()

 const storage = multer.diskStorage({
   destination: function(req, file, cb){
     cb(null,'uploads/')
   },
   filename: function(req, file, cb){
     cb(null, new Date().toISOString()+ file.originalname)
   }
 })
 const filetype = function(req, file, cb){
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
     cb(null, true)
   }
   else{
     cb(null, false)
   }
 }
 const upload = multer({
   storage: storage,
   limits:{
     filesize: 1024*1024*5
   },
   fileFilter:filetype
 })

 router.get('/', function(req, res, next){
   Product.find().
   select("name price _id ProductImage").
   exec().
   then(function(alldata){
     const response = {
       count : alldata.length,
       data: alldata.map(function(alldata){
        return { name: alldata.name,
         price: alldata.price,
         _id: alldata._id,
         ProductImage: 'localHost:3000/' + alldata.ProductImage,
         request:{
           type:'get',
           url:'localHost:3000/products/' + alldata._id
         }
        }
       })
     }
     console.log(response);
     res.status(200).json(response)

   }).catch(function(error){
     console.log(error);
     res.statuc(500).json({
         error: err
       })
   })
 })

 router.post('/', upload.single('one'), function(req, res, next){
   console.log(req.file);
   const product = new Product({
     _id : mongoose.Types.ObjectId(),
     name: req.body.name,
     price: req.body.price,
     ProductImage:req.file.path
   })
   product.save().then(function (result){
     console.log(result);
     res.status(201).json({
       message: 'post request from products route',
       products: {
         name: result.name,
         price: result.price,
         _id: result._id,
         ProductImage: 'localHost:3000/' + result.ProductImage,
         request:{
           type: 'get',
           url:'localHost:3000/products/'+ result._id
         }
       }
     })
   }).catch(function (error){
     console.log(error);
     res.status(500).json({
       error: error.message
     })

   })
 })

 router.get('/:productID', function(req, res, next){
   const ID = req.params.productID
   Product.findById(ID).
   select('name price _id ProductImage').
   exec().
   then( function(data)  {
     const resdata = {
       count: data.length,
       Fdata: {

           name: data.name,
           price:data.price,
           _id: data._id,
           ProductImage: 'localHost:3000/' + data.ProductImage
         }
       }

     console.log(data);
     res.status(200).json({
       dataone : resdata,

     })
   }).
   catch(function(error) {
     console.log(error);
     res.status(500).json({
       error: error
     })
   })
 })


router.patch('/:id', function(req, res, next){
  const ID = req.params.id
  const updateprod = {}
  for(const ops of req.body){
    updateprod[ops.prop] = ops.value
  }
  Product.update({_id : ID}, updateprod).
  exec().
  then(function(result){
    console.log(result);
    res.status(200).json(result)
  }).
  catch(function(error){
    console.log(error);
    res.status(500).json({error:err})
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

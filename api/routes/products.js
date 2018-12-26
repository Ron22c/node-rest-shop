 const express = require('express')
 const mongoose = require('mongoose')
 const multer = require('multer')
 const Product = require('../models/products')
 const Auth = require('../middleware/check_auth')
 const router = express.Router()
 const productcontroller = require('../controllers/products')

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

 router.get('/', productcontroller.product_all)

 router.post('/',Auth, upload.single('one'),  productcontroller.products_addnew)

 router.get('/:productID', productcontroller.products_by_id)

 router.patch('/:id',Auth, productcontroller.update_products)

 router.delete('/:id',Auth, productcontroller.delete_product)

 module.exports = router

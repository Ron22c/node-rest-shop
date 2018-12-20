const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/orders')
const product = require('../models/products')

router.get('/', function(req, res){
  Order.find().select('_id product quantity prodName price').
  exec().
  then(function(detailsAll){
    console.log(detailsAll);
    res.status(201).json(detailsAll)
  }).
  catch(function(error){
    res.status(500).json({
      error: error.message
    })
  })
})

router.post('/',function(req, res, next){
  const Id = req.body.product
  product.findById(Id).then(function(proddetails){
    if(!proddetails){
      res.status(404).json({
        message: 'product not found'
      })
    }
    const order = new Order({
      _id:mongoose.Types.ObjectId(),
      product: req.body.product,
      quantity: req.body.quantity,
      prodName: proddetails.name,
      price: proddetails.price
    })
    return order.save()

  })
  .then(function(result){
    const output = {
      _id: result._id,
      productId: result.product,
      prodName: result.prodName,
      priceUnit: result.price,
      quantity: result.quantity
    }

    console.log(output);
    res.status(201).json(output)
  }).catch(function(error){
    console.log(error);
    res.status(500).json({
      error:error.message
    })
  })
})

router.get('/:orderID', function(req, res){
  const id = req.params.orderID
  Order.findById(id).
  exec().
  then(function(result){
    console.log(result);
    res.status(201).json(result)
  }).
  catch(function(error){
    error: error.message
  })
})

router.delete('/', function(req, res){

})

router.delete('/:orderID', function(req, res){
  const id = req.params.orderID
  Order.remove({_id:id}).
  exec().
  then(function(result){
    console.log(result);
    res.status(201).json({
      message: 'sucessfully deleted',
      data: result
    })
  }).
  catch(function(error){
    console.log(error);
    res.status(500).json({
      error: error.message
    })
  })
})


module.exports = router

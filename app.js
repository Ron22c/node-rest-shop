const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Access, Content-Type')
  if(req.method ==='OPTIONS'){
    res.header('Acess-Control-Allow-Methods', 'Get, Post, Patch, Put, Delete')
    return res.status(200).json({})
  }
  next()
  
})
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use(function(req, res, next){
  var error = new error('not Found')
  error.status = 404
  next(error)
})

app.use(function(error, req, res, next){
  res.status(error.status || 500)
  res.json({
    error: {
      message: 'not found'
    }
  })
})

module.exports = app

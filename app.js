const express = require('express')
const bodyParser = require('body-parser')
const mongeese = require('mongoose')
const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Access, Content-Type')
  if(req.method ==='OPTIONS'){
    res.header('Acess-Control-Allow-Methods', 'Get, Post, Patch, Put, Delete')
    return res.status(200).json({})
  }
  next()
})
app.get('/', function(req, res, next){
  res.send("This is a shopping website")
})
app.use('/uploads', express.static('uploads'))
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

mongeese.connect('mongodb://ranajit:ranajit@node-rest-shop-shard-00-00-yt2hx.mongodb.net:27017,node-rest-shop-shard-00-01-yt2hx.mongodb.net:27017,node-rest-shop-shard-00-02-yt2hx.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
{ useNewUrlParser: true })

app.use(function(req, res, next){
  var error = new error('not Found')
  error.status = 404
  next(error)
})

app.use(function(error, req, res, next){
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app

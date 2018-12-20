const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {type: mongoose.Schema.Types.ObjectId, rel: 'Product', required: true},
  quantity: {type: Number, defult: 1},
  prodName: String,
  price: Number
})

module.exports = mongoose.model('orders', orderSchema)

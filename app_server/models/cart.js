var mongoose = require('mongoose');

var Product = new mongoose.Schema({
    Title: String,
    Description:String,
    ProductDp:String,
    Price:Number,
   Quantity:Number,
   ProductId:String
})



var CartSchema=new mongoose.Schema({
    Purchaser:String,
    Products:[Product]
})


module.exports = mongoose.model('Cart',CartSchema);
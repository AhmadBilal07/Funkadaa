var mongoose = require('mongoose');


var comment=new mongoose.Schema({
    UserId:String,
    CommentText:String,
    UserName: String,
    UserDp: String
})





var ProductSchema = new mongoose.Schema({
    SavedBy: [{
        type: String
    }],
    UserName: String,
    UserDp: String,
    UserId: String,
    ProductDp: String,
    Title: String,
    Category: String,
    ForSale: Boolean,
    Price: {
        type: Number,
        min: 0
    },
    Description: String,
    Quantity: {
        type: Number,
        min: 0
    },
    LikedBy: [String],
    Sold: {
        type: Number,
        default: 0
    },
    Comments: [comment]
})

module.exports = mongoose.model('Product', ProductSchema);
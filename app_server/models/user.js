var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    Name: String,
    Followers:[String],
    Followings: [String],
    Userdp: String,
    Email: String,
    Password: String,
    Posts: {
        type: Number,
        "default": 0
    },
    SavedProducts:[String]
});

module.exports = mongoose.model('User',UserSchema);
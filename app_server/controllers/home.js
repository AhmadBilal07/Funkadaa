var mongoose = require('mongoose');
let product = require('../models/product');
var User = require('../models/user');


module.exports.load = function (req, res) {

  User.findById(req.session.uid, function (err, User) {
    console.log(User.Followings);

    product.find({
      UserId: {
        $in: User.Followings
      }
    }, function (err, Posts) {
      console.log(Posts);

      res.render('home', {
        Posts
      });
    })




  });









}
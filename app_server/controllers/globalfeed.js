var mongoose = require('mongoose');
var fullUrl = require('../absolute-url');
var User = require('../models/user');
let product = require('../models/product');



module.exports.load = function (req, res) {

  User.findById(req.session.uid, function (err, User) {

    if (err)
      throw err;

    User.Userdp = fullUrl(req, User.Userdp);
    console.log(User);


    product.find({}, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        if (product.LikedBy.indexOf(req.session.uid)) {
          product["liked"] = 1;
        } else
          product["liked"] = 1;

        return product;
      });
      console.log("------------------");

      console.log(products);
      console.log("------------------");





      res.render('globalfeed', {
        products,
        User
      });
    }).where({
      UserId: {
        $ne: req.session.uid
      }
    });




  })



}
module.exports.Sketches = function (req, res) {
  console.log("sketches");
  User.findById(req.session.uid, function (err, User) {


    User.Userdp = fullUrl(req, User.Userdp);
    console.log(User);


    product.find({
      Category: 'Sketch'
    }, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        product.UserDp = fullUrl(req, product.UserDp);
        product.Comments.map((c) => {
          c.UserDp = fullUrl(req, c.UserDp);
          return c;
        })
        return product;
      });

      res.render('globalfeed', {
        products,
        User
      });
    }).where({
      UserId: {
        $ne: req.session.uid
      }
    });
  });
}





module.exports.Paintings = function (req, res) {
  console.log("Paintings");
  User.findById(req.session.uid, function (err, User) {


    User.Userdp = fullUrl(req, User.Userdp);
    console.log(User);


    product.find({
      Category: 'Painting'
    }, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        product.UserDp = fullUrl(req, product.UserDp);

        product.Comments.map((c) => {
          c.UserDp = fullUrl(req, c.UserDp);
          return c;
        })

        return product;
      });

      res.render('globalfeed', {
        products,
        User
      });
    }).where({
      UserId: {
        $ne: req.session.uid
      }
    });
  });
}




module.exports.Handicraft = function (req, res) {
  console.log("Handicraft");
  User.findById(req.session.uid, function (err, User) {


    User.Userdp = fullUrl(req, User.Userdp);
    console.log(User);


    product.find({
      Category: 'Handicraft'
    }, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        product.UserDp = fullUrl(req, product.UserDp);
        product.Comments.map((c) => {
          c.UserDp = fullUrl(req, c.UserDp);
          return c;
        })
        return product;
      });

      res.render('globalfeed', {
        products,
        User
      });
    }).where({
      UserId: {
        $ne: req.session.uid
      }
    });
  });
}



module.exports.Calligraphy = function (req, res) {
  console.log("Calligraphy");
  User.findById(req.session.uid, function (err, User) {


    User.Userdp = fullUrl(req, User.Userdp);
    console.log(User);


    product.find({
      Category: 'Calligraphy'
    }, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        product.UserDp = fullUrl(req, product.UserDp);
        product.Comments.map((c) => {
          c.UserDp = fullUrl(req, c.UserDp);
          return c;
        })

        return product;
      });

      res.render('globalfeed', {
        products,
        User
      });
    }).where({
      UserId: {
        $ne: req.session.uid
      }
    });
  });
}
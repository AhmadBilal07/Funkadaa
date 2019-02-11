var mongoose = require('mongoose');
let Product = require('../models/product');
var User = require('../models/user');
var fullUrl = require('../absolute-url');


module.exports.load = function (req, res) {

  User.findById(req.session.uid, function (err, user) {
    if (err)
      throw err;
    console.log(req.session.uid);
    user.Userdp = fullUrl(req, user.Userdp);

    Product.find({
      UserId: req.session.uid
    }, function (err, products) {

      // Makes relative URLs, absolute URLs
      products.map(function (product) {
        product.ProductDp = fullUrl(req, product.ProductDp);
        product.Comments.map((c) => {
          c.UserDp = fullUrl(req, c.UserDp);
          return c;
        })
        return product;
      });
      res.render('profile', {
        User: user,
        Myproducts: products
      })
    })
  });
}




module.exports.saved = function (req, res) {


  User.findById(req.session.uid, function (err, user) {

    if (err)
      throw (err);
    else {
      user.Userdp = fullUrl(req, user.Userdp);

      Product.find({
        SavedBy: req.session.uid
      }, function (err, products) {
        // Makes relative URLs, absolute URLs
        products.map(function (product) {
          product.ProductDp = fullUrl(req, product.ProductDp);
          product.UserDp = fullUrl(req, product.UserDp);
          return product;
        });
        res.render('profile', {
          User: user,
          Myproducts: products
        })
      })
    }
  });
}

module.exports.uploadProduct = function (req, res) {
  const Title = req.body.product_title;
  const Description = req.body.Description;
  const Quantity = req.body.Quantity;
  let ForSale = req.body.ForSale;
  const Price = req.body.Price;
  const Category = req.body.Category;


  if (ForSale == 'on') {
    ForSale = 1;
  } else {
    ForSale = 0;

  }








  User.findById(req.session.uid, function (err, user) {

    let newProduct = new Product({
      Title: Title,
      Description: Description,
      ForSale: ForSale,
      Quantity: Quantity,
      Price: Price,
      ProductDp: 'images/Uploads/Products/' + req.file.filename,
      Category: Category,
      UserId: req.session.uid,
      UserName: user.Name,
      UserDp: user.Userdp

    });

    newProduct.save(function (err) {
      if (err) {
        throw err;
      } else {
        res.redirect('/profile');

      }
    });








  })






  User.findByIdAndUpdate(req.session.uid, {
      $inc: {
        Posts: 1
      }

    },
    function (err) {
      if (err) {
        throw (err);
      }
    })
}



module.exports.followers = function (req, res) {




  User.findById(req.session.uid, function (err, user) {
    user.Userdp = fullUrl(req, user.Userdp);


    User.find({
      _id: {
        $in: user.Followers
      }
    }, function (err, result) {
      console.log(result);

      //Makes relative URLs, absolute URLs
      result.map(function (item) {
        item.Userdp = fullUrl(req, item.Userdp);
        return item;
      });



      res.render('follower', {
        User: user,
        Person: result


      })
    });
  })
}
module.exports.followings = function (req, res) {




  User.findById(req.session.uid, function (err, user) {
    user.Userdp = fullUrl(req, user.Userdp);


    User.find({
      _id: {
        $in: user.Followings
      }
    }, function (err, result) {
      console.log(result);

      //Makes relative URLs, absolute URLs
      result.map(function (item) {
        item.Userdp = fullUrl(req, item.Userdp);
        return item;
      });



      res.render('follower', {
        User: user,
        Person: result


      })
    });
  })
}
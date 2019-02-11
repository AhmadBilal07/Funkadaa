var mongoose = require('mongoose');
let Product = require('../models/product');
let User = require('../models/user');
let Cart = require('../models/cart');


module.exports.comment = function (req, res) {

  console.log(req.body.productid);
  console.log(req.body.comment);



  User.findById(req.session.uid, function (err, user) {

    if (err)
      throw (err);
    else {
      var comment = ({

        UserId: req.session.uid,
        CommentText: req.body.comment,
        UserName: user.Name,
        UserDp: user.Userdp
      })




      Product.findByIdAndUpdate(req.body.productid, {
          $push: {
            Comments: comment
          }
        },
        function (err) {
          if (err) {
            throw err;
          }
        })





    }


    res.send({
      Comment: comment.CommentText,
      UserName: user.Name,
      UserDp: user.Userdp,
      Productid: req.body.productid
    });


  })




}



module.exports.like = function (req, res) {


  Product.findByIdAndUpdate(req.params.id, {
      $push: {
        LikedBy: req.session.uid
      }
    },
    function (err) {
      if (err) {
        throw (err);
      }
    })


  res.send();

}



module.exports.save = function (req, res) {
  console.log("saved");


  User.findByIdAndUpdate(req.session.uid, {
      $push: {
        SavedProducts: req.params.id
      }
    },
    function (err) {
      if (err) {
        throw (err);
      }
    })

  Product.findByIdAndUpdate(req.params.id, {
      $push: {
        SavedBy: req.session.uid
      }
    },
    function (err) {
      if (err) {
        throw (err);
      }
    })

  res.send();

}


module.exports.cart = function (req, res) {
  console.log("added to cart");
  console.log(req.params.id);
  Product.findById(req.params.id, function (err, item) {
    if (err)
      throw (err);
    else {

      var product = {
        Title: item.Title,
        Description: item.Description,
        ProductDp: item.ProductDp,
        Price: item.Price,
        Quantity: item.Quantity,
        ProductId: item._id
      }

      Cart.findOneAndUpdate({
        Purchaser: req.session.uid
      }, {
        $push: {
          Products: product
        }
      }, function (err, result) {
        if (!result) {
          var mycart = new Cart({
            Purchaser: req.session.uid
          });
          mycart.Products.push(product);
          mycart.save();

        } else {
          $push: {
            Products: product;
          }
        }
      })




      res.send();




    }
  })



}









module.exports.follow = function (req, res) {


  if (!(req.params.id == req.session.uid)) {
    User.findByIdAndUpdate(req.params.id, {
        $push: {
          Followers: req.session.uid
        }

      },
      function (err) {
        if (err) {
          throw (err);
        }

        User.findByIdAndUpdate(req.session.uid, {
            $push: {
              Followings: req.params.id
            }
          },
          function (err) {
            if (err) {
              throw (err);
            }
          })


      })
  } else {
    console.log("user not added");
  }


  res.send();

}
var mongoose = require('mongoose');
let Cart = require('../models/cart');


module.exports.delete = function (req, res) {
  console.log("in delete");



  Cart.findOne({
    Purchaser: req.session.uid
  }, function (err, result) {
    result.Products.id(req.params.id).remove();
    result.save();
  });



  res.send();

}
module.exports.load = function (req, res) {

  Cart.findOne({
    Purchaser: req.session.uid
  }, function (err, result) {

    if (err)
      throw (err);
    else {
      // var prods = result.ToObject({});
      console.log(result);

      if (result == null) {

        res.render('cart', {
          products: []
        });
      } else {
        res.render('cart', {
          products: result.Products
        });
      }
    }


  })
}
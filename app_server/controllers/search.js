var mongoose = require('mongoose');
var fullUrl = require('../absolute-url');

let Product = require('../models/product');
var User = require('../models/user');





module.exports.showpeopleLoad = function (req, res) {
    Person = [];
    res.render('searchresultpeople', {
        Person
    });
}

module.exports.showproductLoad = function (req, res) {
    products = [];
    res.render('searchresultartwork', {
        products
    });
}
module.exports.showproduct = function (req, res) {



    User.findById(req.session.uid, function (err, User) {
        User.Userdp = fullUrl(req, User.Userdp);

        const text = req.params.text.split('+').join(' ');
        Product.find({
            $or: [{
                Title: {
                    "$regex": text,
                    "$options": "i"
                }
            }, {
                Description: {
                    "$regex": text,
                    "$options": "i"
                }
            }]
        }, function (err, products) {



            if (err) {
                throw (err);
            } else {
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
                res.send({
                    products,
                    User
                });
            }
        })
    });
}


module.exports.showpeople = function (req, res) {
    const text = req.params.text.split('+').join(' ');
    User.find({
        Name: {
            "$regex": text,
            "$options": "i"
        }
    }, function (err, Person) {

        if (err) {
            throw (err);
        } else {
            // Makes relative URLs, absolute URLs
            Person.map(function (person) {
                person.Userdp = fullUrl(req, person.Userdp);

                person.post


                return person;


            });



            res.render('searchresultpeople', {
                Person
            });
        }
    })
}
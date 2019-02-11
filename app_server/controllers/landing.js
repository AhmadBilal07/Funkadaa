var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
let User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.load = function (req, res) {
  res.render('landing');
}




module.exports.login = function (req, res) {
  console.log("login");

  const email = req.body.emailL;
  const password = req.body.passwordL;

  console.log(email);

  User.findOne({
    Email: email
  }).exec(function (err, user) {
    if (err) {
      console.log(err);

    } else if (!user) {
      console.log("User not registered");
      res.redirect('/');
    } else {
      console.log("USer exists");

      bcrypt.compare(password, user.Password, function (err, hashCheck) {
        if (err) {
          throw (err);
        }
        console.log("Matching password\n");
        if (hashCheck) {
          req.session.uid = user._id;
          res.redirect('/globalfeed');
          console.log(res);
        } else {
          res.redirect('/');
          console.log(res);
        }

      });
    }
  })





}

module.exports.register = function (req, res) {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, function (err, hash) {
    let newUser = new User({
      Name: name,
      Email: email,
      Password: hash,
      Userdp: 'images/Uploads/dps/' + req.file.filename
    });

    newUser.save(function (err) {
      if (err) {
        throw err;
      } else {
        //res.send("item saved to database");
        //req.flash('Success', 'You are succesfully registered');

        res.redirect('/');

      }
    });
  });



};
var express = require('express');
var router = express.Router();
var multer = require('multer')
var multer = require('multer');
var upload = multer();
var landing = require('../controllers/landing');
var home = require('../controllers/home');
var profile = require('../controllers/profile');
var globalfeed = require('../controllers/globalfeed');
var cart = require('../controllers/cart');
var search = require('../controllers/search');
var extras = require('../controllers/extras');



var storageUserdp = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/Uploads/dps/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');

  }
});

var uploadDp = multer({
  storage: storageUserdp
});





/*
const checkIfNotLoggedIn = function(req, res) {
if(req.session.uid)
  res.redirect();
}
*/

var logout=function (req, res) {
  console.log("Session Closing")
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}


var storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/uploads/Products/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});

var uploadProduct = multer({
  storage: storageProduct
});

const checkIfLoggedIn = function (req, res, next) {
  if (!req.session.uid)
    res.redirect('/');
  next();
}


router.get('/logout', logout);
router.get('/', landing.load);
router.get('/home', checkIfLoggedIn, home.load);
router.get('/cart', checkIfLoggedIn, cart.load);
router.get('/profile', checkIfLoggedIn, profile.load);
router.get('/profile/saved', checkIfLoggedIn,  profile.saved);
router.get('/profile/followers', checkIfLoggedIn,  profile.followers);
router.get('/profile/following',checkIfLoggedIn, profile.followings);
router.get('/globalfeed', checkIfLoggedIn, globalfeed.load);
router.get('/globalfeed/Sketches', checkIfLoggedIn, globalfeed.Sketches);
router.get('/globalfeed/Paintings', checkIfLoggedIn, globalfeed.Paintings);
router.get('/globalfeed/Calligraphy', checkIfLoggedIn, globalfeed.Calligraphy);
router.get('/globalfeed/Handicrafts', checkIfLoggedIn, globalfeed.Handicraft);
router.get('/search/people/',checkIfLoggedIn,search.showpeopleLoad);
router.get('/search/people/:text',checkIfLoggedIn,search.showpeople);
router.get('/search/:text',checkIfLoggedIn, search.showproduct);
router.get('/search',checkIfLoggedIn,search.showproductLoad);

router.put('/follow/:id',checkIfLoggedIn,extras.follow);
router.put('/like/:id',checkIfLoggedIn,extras.like);
router.put('/bookmark/:id',checkIfLoggedIn,extras.save);
router.put('/AddToCart/:id',checkIfLoggedIn,extras.cart);
router.put('/comment',checkIfLoggedIn,extras.comment);
router.delete('/delete/:id',checkIfLoggedIn,cart.delete);



router.post('/register', uploadDp.single('display_image'), landing.register);
router.post('/login', landing.login);
router.post('/profile/upload', checkIfLoggedIn, uploadProduct.single('ProductDp'), profile.uploadProduct);





module.exports = router;
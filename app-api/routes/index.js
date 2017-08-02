var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

const BookCtrl = require('../controllers/books');
const UserCtrl = require('../controllers/users');
const ctrlAuth = require('../controllers/auth');

/* books */
router.get('/books',BookCtrl.listBooks);
router.get('/book/:id',BookCtrl.listBook);
router.get('/book/category/:name',BookCtrl.listByCategory);
router.get('/book/search/:search',BookCtrl.listBySearch);
router.post('/book',BookCtrl.postBook);
router.post('/book/cart', BookCtrl.getCartItems); // get cart items to filter
router.post('/book/cart/reserve',BookCtrl.makeReservation); // reserve books and send notification
router.put('/book/cancel-reservation/:id',BookCtrl.cancelReservation); // cancel reservation
router.post('/book/remove-reservation',BookCtrl.removeReservation); // remove reservation in a bulk
router.put('/book/:id',BookCtrl.updateBook);
router.delete('/book/:id',BookCtrl.deleteBook);
/* Reviews */
router.post('/book/:bookid/review', BookCtrl.addReview);
router.get('/book/:bookid/review/:reviewid', BookCtrl.readReview);

/* users */
router.get('/users',UserCtrl.listUsers);
router.get('/user/:id',UserCtrl.listUser);
router.post('/user',UserCtrl.postUser);
router.put('/user/:id',UserCtrl.updateUser);
router.delete('/user/:id',UserCtrl.deleteUser);
//Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
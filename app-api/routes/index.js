var express = require('express');
var router = express.Router();

const BookCtrl = require('../controllers/books');
const UserCtrl = require('../controllers/users');

/* books */
router.get('/books',BookCtrl.listBooks);
router.get('/book/:id',BookCtrl.listBook);
router.get('/book/category/:name',BookCtrl.listByCategory);
router.get('/book/search/:search',BookCtrl.listBySearch);
router.post('/book',BookCtrl.postBook);
router.post('/book/cart',BookCtrl.getCartItems); // get cart items to filter
router.post('/book/cart/reserve',BookCtrl.makeReservation); // reserve books and send notification
router.put('/book/:id',BookCtrl.updateBook);
router.delete('/book/:id',BookCtrl.deleteBook);

/* users */
router.get('/users',UserCtrl.listUsers);
router.get('/user/:id',UserCtrl.listUser);
router.post('/user',UserCtrl.postUser);
router.put('/user/:id',UserCtrl.updateUser);
router.delete('/user/:id',UserCtrl.deleteUser);


module.exports = router;
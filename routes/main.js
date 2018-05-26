const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');



router.get('/', controller.getItems)
router.get('/image/:id', controller.getImage)



router.get('/search', controller.searchItem);
router.post('/', controller.addToCart)
//router.delete('/checkout', controller.checkout)


module.exports = router;
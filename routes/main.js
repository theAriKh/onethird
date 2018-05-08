const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');



router.get('/', controller.getItems)

router.get('/giveaway', (req,res)=>{
    res.render("giveaway");
})

router.post('/', controller.addToCart)
//router.delete('/checkout', controller.checkout)


module.exports = router;
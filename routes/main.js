const express = require('express');
const router = express.Router();
const controller = require('../controllers/main');



router.get('/', controller.getItems)
router.get('/image/:id', controller.getImage)

router.get('/giveaway', (req,res)=>{
    res.render("giveaway");
})

router.get('/search', controller.searchItem)



// router.get('/mainsearch', (req, res)=>{

//     res.render("mainsearch", {
//         items:[]
//     })
// })

router.post('/', controller.addToCart)
//router.delete('/checkout', controller.checkout)


module.exports = router;
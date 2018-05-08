const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/login', (req, res) => {
    res.render('users/login', {
        errors: []
    })
})


router.post('/login', controller.getUser)


router.get('/register',controller.register)


// create new user
router.post('/register', controller.createUser)

router.get('/myaccount', controller.getMyAccount)

router.get('/logout', controller.logout)

router.post('/checkout', controller.checkout)

module.exports = router;
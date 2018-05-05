

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/login', (req, res) => {
    res.render('users/login', {
        errors: []
    })
})


router.post('/login', controller.getUser)


router.get('/register', (req, res) => {
    res.render('users/register', {
        errors: [],
        name: '',
        email:"",
        password: "",
        password2: "",
        streetAddress: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
        phoneNumber:""
    })
})


// create new user
router.post('/register', controller.createUser)

router.get('/myaccount', (req, res) => {
    res.render('users/myaccount')
})

router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success_msg', "You are logged out")
    res.redirect('/users/login')
})

module.exports = router;
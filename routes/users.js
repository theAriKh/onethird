const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.get('/myaccount', (req, res) => {
    res.render('users/myaccount')
})

router.get('/logout', (req,res)=>{
    res.redirect('/users/login')
})



module.exports = router;
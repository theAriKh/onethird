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

module.exports = router;
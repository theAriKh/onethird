const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// move them into controller
const bcrypt = require('bcryptjs');
const passport = require('passport');
// load user model
require('../models/user');
const User = mongoose.model('user');

router.get('/login', (req, res) => {
    res.render('users/login', {
        errors: []
    })
})

router.post('/login', (req,res, next)=>{
    passport.authenticate('local', {
        successRedirect:'/main',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);

})

router.get('/register', (req, res) => {
    console.log("here")
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

router.post('/register', (req, res)=>{
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({ text : 'Passwords do not match'})
    }
    if (errors.length > 0){
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postalCode: req.body.postalCode,
            phoneNumber: req.body.phoneNumber
        })
    }
    
    else {
        const newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postalCode: req.body.postalCode,
            phoneNumber: req.body.phoneNumber
        })

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user=>{
                    req.flash('success_msg', "Registration was successful")
                    res.redirect('login')
                }).catch(err=>{
                    console.log(err);
                    return;
                })

            })
            
        })

    }

})

router.get('/myaccount', (req, res) => {
    res.render('users/myaccount')
})

router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success_msg', "You are logged out")
    res.redirect('/users/login')
})



module.exports = router;
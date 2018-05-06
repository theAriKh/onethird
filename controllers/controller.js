require('../models/user');

const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

var createUser = function(req, res){
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
            phoneNumber: req.body.phoneNumber,
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
}

var getUser = function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/main',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next);
}

var getMyAccount = function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error_msg', 'Not Authorized');
        res.redirect('login')
    } else {
        User.findOne({
            _id:req.user.id
        }).then(user=>{
            console.log("what", user)
            console.log('getMyAccount', user.name)
            res.render('users/myaccount', {
                user: user
            })
        })
      
    }
}


module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getMyAccount = getMyAccount;
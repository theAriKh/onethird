require('../models/user');
require('../models/items');

const mongoose = require('mongoose');
const User = mongoose.model('user');
const Item = mongoose.model('item');
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
        successRedirect: '/main',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next)
}

var getMyAccount = function(req, res){
    if(!req.isAuthenticated()){
        req.flash('error_msg', 'Not Authorized');
        res.redirect('login')
    } else {
        User.findOne({
            _id:req.user.id
        }).then(user=>{
            res.render('users/myaccount', {
                user: user
            })
        })
      
    }
}

var logout = function(req, res){
    req.logout();
    req.flash('success_msg', "You are logged out")
    res.redirect('/users/login')
}

var register = function(req, res){
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

}

var checkout = function(req, res){
    let myitems = req.session.myCart;
    console.log("in check out, controler, user:", req.user)
    console.log("in check out, controler, myitems:", myitems)

    // right now only one item can be checked out...
    Item.remove({
        _id: myitems[0]._id
    }).then(() => {
        req.flash('success_msg', "Checkout was successful")
        res.redirect('/main')
    })

}


module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getMyAccount = getMyAccount;
module.exports.logout = logout;
module.exports.register = register;
module.exports.checkout = checkout;
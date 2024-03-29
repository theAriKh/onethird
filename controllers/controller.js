require('../models/user');
require('../models/items');
require('../models/receipt');

const mongoose = require('mongoose');
const User = mongoose.model('user');
const Item = mongoose.model('item');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Receipt = mongoose.model('receipt');
const moment = require('moment');

// Creates user upon registration
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
        });


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

// Authenticate user
var getUser = function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/users/login',
        failureFlash:true
    })(req,res,next)
}

// Gets all relevent information about user profile
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

// Get all relevant past orders for user from mongoDB
var getReceipts = function(req,res) {
    Receipt.find({user: req.user.id}).sort({date: 'descending'}).then(receipts => {
            res.render('users/myOrders', {
                receipts : receipts,
                address : req.user.streetAddress.concat(' ', req.user.city, ' ', req.user.province),
                moment: moment
            });
                
            //console.log(receipts);
        }
    )
}

// Logs in user
var login = function(req, res){
    res.render('users/login', {
        errors: []
    })

}

// Logs out user
var logout = function(req, res){
    req.logout();
    req.flash('success_msg', "You are logged out")
    res.redirect('/users/login')
}

// Default information for register page
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

// Facilitates checkout
var checkout = function(req, res){
    let inputValue = req.body.button;
    let myitems = req.session.myCart;
    let tempItems = [];
    console.log("checkout: ", req.body.button)
    console.log("inputvalue", inputValue)
    console.log(myitems);

    if (inputValue == "checkout"){
        User.findById({
            _id: req.user.id
        }).then(user=>{
            let ids = [];
            let totalpoints = 0;
            Object.keys(myitems).forEach(key=>{
                ids.push(myitems[key]._id)
                totalpoints += myitems[key].points
                tempItems.push(myitems[key]);
            })
 
            if (user.points >= totalpoints){
                user.points = user.points - totalpoints;
                user.save().then(()=>{
                    Item.remove({
                        _id: {$in: ids}
                    }).then(() => {
                        console.log("before creating receipt, sessionI", req.session.myCart)
                        console.log("before creating receipt, myitems", req.session.myCart)              
                        const receipt = new Receipt({

                            user : req.user.id,
                            points : totalpoints,
                            orderItems : req.session.myCart
                        });

                        receipt.save().then(receipt=>{
                            req.session.myCart = {};
                            req.session.totalpoints = 0;
                            req.flash('success_msg', "Checkout was successful")
                            res.redirect('/main')

                        })

                        
                    })
                })

            }
            else {
                req.flash('error_msg', "Sorry, you don't have enough points to checkout. ")
                res.redirect('/main')
                
            }
         
        })

    } else {

        console.log("in remove", req.body.button)
        console.log("before", req.session.myCart)
        req.session.totalpoints -= req.session.myCart[inputValue].points
        delete req.session.myCart[req.body.button]
        console.log("prining my cart", req.session.myCart)
        console.log("cart after removed", req.session.myCart[inputValue])
       
        req.flash('success_msg', "The item was removed from your cart")
        res.redirect('/main')

    }
}


// updates user's account info
var updateInfo = function(req, res){
    User.findOne({
        _id : req.user.id
    }).then(user=>{
        user.name = req.body.name;
        user.email = req.body.email;

        user.save().then(user=>{
            req.flash('success_msg', 'User Info is updated');
            res.redirect('/users/myaccount');
        })
    })



}


// updates user's home address
var updateAddress = function(req, res){
    User.findOne({
        _id: req.user.id
    }).then(user=>{
        user.streetAddress = req.body.streetAddress;
        user.city = req.body.city;
        user.province = req.body.province;
        user.country = req.body.country;
        user.postalCode = req.body.postalCode;
        user.phoneNumber = req.body.phoneNumber;

        user.save().then(user=>{
            req.flash('success_msg', 'User Address is updated');
            res.redirect('/users/myaccount');
        })
    })
}


module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.getMyAccount = getMyAccount;
module.exports.logout = logout;
module.exports.login = login;
module.exports.register = register;
module.exports.checkout = checkout;
module.exports.updateInfo = updateInfo;
module.exports.updateAddress = updateAddress;
module.exports.getReceipts = getReceipts;
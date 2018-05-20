require('../models/items');
require('../models/user');
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const User = mongoose.model('user');



var getItems = function (req, res) {
    let myitems = [];
    Item.find({}).then(items => {
        
        res.render('main', {
            items: items,
            myitems: myitems
        })
    })

}

var addToCart = function (req, res) {
    

    Item.findOne({
        _id: req.body.itemId
    }).then(item => {
        
        // need to figure out how to save myCart
        //START FROM HERE

        if (req.session.myCart){
            req.session.myCart.push(item);
            console.log("added?", req.session.myCart)
        }
        else {
            let myitems = [];
            myitems.push(item);
            req.session.myCart = myitems;
            console.log("In add cart", req.session.myCart)

        }

        //console.log("printing myitem",  req.user.myCart)
        Item.find({}).then(items => {

            req.flash('success_msg', "Item is added successfully")
            console.log("helllloo")
            res.render('main', {
                items: items,
                myitems: req.session.myCart
            })
        })
    })

}

var checkout = function (req, res) {
    let myitems = req.session.myCart;
    console.log("in check out,main, myitems:", myitems)

    // right now only one item can be checked out...
    Item.remove({
        _id: myitems[0]._id
    }).then(() => {
        req.flash('success_msg', "Checkout was successful")
        res.redirect('/')
    })


    // for (i = 0; i< myitems.length; i++){
    //     Item.remove({
    //         _id: myitems[i].itemId
    //     }).then(()=>{
    //         console.log("REMOVED")
    //         next();
    //     })
    // }

    // req.flash('success_msg', "Checkout was successful")
    // res.redirect('/')

}

module.exports.getItems = getItems;
module.exports.addToCart = addToCart;
module.exports.checkout = checkout;

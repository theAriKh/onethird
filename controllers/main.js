require('../models/items');
require('../models/user');
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const User = mongoose.model('user');
const moment = require('moment');



var getItems = function (req, res) {
    if (req.session.totalpoints == null) {
        req.session.totalpoints = 0;
    }

    let myitems = {};
    let totalpoints = req.session.totalpoints
    Item.find({}).then(items => {

        res.render('main', {
            moment:moment,
            items: items,
            myitems: myitems,
            totalpoints: totalpoints
        })
    })

}

var addToCart = function (req, res) {
    let totalpoints = req.session.totalpoints
    let myitems = {};


    Item.findOne({
        _id: req.body.itemId
    }).then(item => {

        if (req.session.myCart) {
            myitems[item._id]=item
            req.session.myCart=myitems;
            req.session.totalpoints += item.points
        }
        else {
            console.log("here", req.session.myCart)
            req.session.myCart = {}
            console.log("length", Object.keys(req.session.myCart).length)
            req.session.myCart[item._id] = item;
            req.session.totalpoints += item.points
            console.log('before', req.session.totalpoints)
            console.log("total points", req.session.totalpoints)
            console.log("In add cart", req.session.myCart)
            req.flash('success_msg', "Item is added successfully")

        }

        //console.log("printing myitem",  req.user.myCart)
        Item.find({}).then(items => {

            req.flash('success_msg', "Item is added successfully")
            res.render('main', {
                moment: moment,
                items: items,
                myitems: req.session.myCart,
                totalpoints: totalpoints
            })
        })
    })

}

var searchItem = function (req, res) {

    if (req.session.myCart == null) {
        req.session.myCart = []
    }


    if (req.query.search) {

        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        Item.find({
            "title": regex
        }).then((items) => {
            console.log("In search item", req.query.search)
            res.render('main', {
                moment:moment,
                items: items,
                myitems: req.session.myCart
            })
        })
        console.log("Searching")

    }
    else {

        Item.find({}).then(items => {

            res.render('main', {
                items: items,
                myitems: req.session.myCart,
                moment: moment,
                totalpoints: req.session.totalpoints
            })
        })

    }
}

var getImage = function(req, res){

    //res.send()
}


// this function is taken from https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.getItems = getItems;
module.exports.addToCart = addToCart;
//module.exports.checkout = checkout;
module.exports.searchItem = searchItem;
module.exports.getImage = getImage;

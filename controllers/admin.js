require('../models/items');
require('../models/user');
var fs = require('fs');

const mongoose = require('mongoose');
const Item = mongoose.model('item');
const User = mongoose.model('user');


var isAdmin = function (req, res) {
    Item.find({}).then(items=>{
        res.render('admin/index', {
            items: items
        })
    })
}

var addItem = function(req, res){
    res.render('admin/add')
}

var processItem = function(req, res){
    let errors = [];
    if (!req.body.title){
        errors.push({text: 'Please add a title'});
    }
    if(!req.body.description){
        errors.push({text: 'Please add some description'});
    }
    if (errors.length>0){
        res.render('/admin/index', {
            errors: errors,
            title: req.body.title,
            description: req.body.description
        })
    } else {
        const newItem = new Item ({
            title: req.body.title,
            photolink: req.body.photolink,
            //photo: fs.readFileSync(req.file.path),
            description: req.body.description,
            quantity: req.body.quantity,
            date: req.body.expiryDate,
            points: req.body.points,
            userid: req.user.id
        })



        new Item(newItem).save().then(item=>{

            User.findById({
                _id: req.user.id
            }).then(user=>{
                user.points = user.points + req.body.points
                user.save().then(()=>{
                    
                    req.flash('success_msg', 'Item is added');
                    res.redirect('/admin/index')

                })
                
            })
            
        })
    };
}


module.exports.isAdmin = isAdmin;
module.exports.addItem = addItem;
module.exports.processItem = processItem;
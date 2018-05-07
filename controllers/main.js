require('../models/items');

const mongoose = require('mongoose');
const Item = mongoose.model('item');


var getItems = function(req, res){
    let myitems = [];

    Item.find({}).then(items=>{

        res.render('main', {
            items: items,
            myitems: myitems
        })

      
    })

}

module.exports.getItems = getItems

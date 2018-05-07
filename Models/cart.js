const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('items.js');

const CartSchema = new Schema({
    cart : [item]
});

mongoose.model('cart', CartSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const item = require('items.js');

const RecieptSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    streetAddress:{
        type:String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    province:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    orderItems : [item]
});
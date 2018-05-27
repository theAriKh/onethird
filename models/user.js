const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const receipt = require('receipt');

const ItemSchema = new Schema({
    title: {
        type: String
    },
    // photo: {
    //     data: Buffer,
    //     contentType: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    points:{
        type: Number,
        required: true
    },
    approved:{
        type: Boolean,
        default: false
    }
});

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
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
    phoneNumber:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    points:{
        type: Number,
        default: 100
    },
    admin:{
        type: Boolean,
        default: false
    },
    myCart: [ItemSchema]
});

mongoose.model('user', UserSchema);
mongoose.model('cartItem', ItemSchema);
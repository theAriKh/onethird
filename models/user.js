const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // photo: {
    //     data: Buffer,
    //     contentType: String,
    //     required: true
    // },
    description: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    date: {
        type: Date,
        required:true
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
        default: 0
    },
    admin:{
        type: Boolean,
        default: false
    },
    myCart: [ItemSchema]
});

mongoose.model('user', UserSchema);
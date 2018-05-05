const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

mongoose.model('user', UserSchema);
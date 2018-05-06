const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
});

mongoose.model('item', ItemSchema);
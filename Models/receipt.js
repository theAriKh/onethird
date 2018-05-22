const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const items = require('mongoose').model('item');

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
    date:{
        type: Date,
        required: true
    },
    orderItems : [items]
});

mongoose.model('receipt', RecieptSchema);
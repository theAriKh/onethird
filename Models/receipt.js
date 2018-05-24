const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = mongoose.model('item');

// A schema that contains information of a purchase after checkout
const ReceiptSchema = new Schema({
    //populate user by user ID, for finding
    user : {
        type : Schema.ObjectId,
        ref : 'user'
    },
    // Assign date based on date/time of checkout clicked
    date:{
        type: Date,
        default : Date.now
    },
    // Array containing all things in users cart
    orderItems : [{type : ObjectId, ref: 'user'}]
});

mongoose.model('receipt', ReceiptSchema);


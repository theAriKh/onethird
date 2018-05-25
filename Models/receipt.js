const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = mongoose.model('user');
const Item = mongoose.model('item');

// A schema that contains information of a purchase after checkout
const ReceiptSchema = new Schema({
    //populate user by user ID
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    // Assign date based on date/time of checkout clicked
    date:{
        type: Date,
        default : Date.now
    },
    // Array containing all things in users cart
    orderItems : [Item]
});

mongoose.model('receipt', ReceiptSchema);


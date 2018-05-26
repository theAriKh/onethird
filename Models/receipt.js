
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Item = mongoose.model('item').schema;

// A schema that contains information of a purchase after checkout


const ReceiptSchema = new Schema({
    //populate user by user ID
    user : {
        type : String,
        required : true
    },
    // Assign date based on date/time of checkout clicked
    date:{
        type: Date,
        default : Date.now
    },
    // Array containing all things in users cart
    orderItems : {}
});

let receipt = mongoose.model('receipt', ReceiptSchema);

module.exports = {receipt : receipt};
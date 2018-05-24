const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = mongoose.model('item');

const ReceiptSchema = new Schema({
    user : {
        type : Schema.ObjectId,
        ref : 'user'
    },
    date:{
        type: Date,
        default : Date.now
    },
    orderItems : [ItemSchema]
});

mongoose.model('receipt', ReceiptSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReceiptSchema = require('mongoose').model('receipt');

const PurchaseHistorySchema = new Schema({
    customer:{
        type: String,
        required: true
    },
    receipts: [ReceiptSchema]
});

mongoose.model('purchaceHistory', PurchaseHistorySchema);
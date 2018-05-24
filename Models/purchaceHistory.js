const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReceiptSchema = mongoose.model('receipt');

// A schema for recording all previous checkouts, and collating receipts.

const PurchaseHistorySchema = new Schema({
    user :{
        type: Schema.ObjectId,
        ref : 'user'
    },
    receipts : [ReceiptSchema]
});

module.exports = mongoose.model('purchaseHistory', PurchaseHistorySchema);
// models/Account.js
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    account_name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
    account_type: {
        type: String,
        enum: ['savings', 'checking', 'credit', 'investment'],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Account', AccountSchema);

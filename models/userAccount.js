'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccountSchema = new Schema({
    accountName: {
        type: String,
        required: true,
    }
});

mongoose.model('UserAccount', UserAccountSchema);

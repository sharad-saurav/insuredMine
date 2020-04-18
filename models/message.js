'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    }
});

mongoose.model('Message', MessageSchema);
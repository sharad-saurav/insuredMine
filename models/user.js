'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        required: false,
    },
   
});

mongoose.model('User', UserSchema);

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
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
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

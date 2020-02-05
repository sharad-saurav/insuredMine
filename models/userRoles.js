'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserRolesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    auth: {
        type: String
    }
});

mongoose.model('UserRoles', UserRolesSchema);
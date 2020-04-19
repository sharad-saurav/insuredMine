'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyInfoSchema = new Schema({
    policyNumber: {
        type: String,
        required: true,
    },
    policyStartDate: {
        type: String,
        required: true,
    },
    policyEndDate: {
        type: String,
        required: true,
    },
    policyCategory: {
        type: String,
        required: true,
    },

    collectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },

    companyCollectionId: {
        type: Schema.Types.ObjectId,
        ref: 'PolicyCarrier',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

mongoose.model('PolicyInfo', PolicyInfoSchema);


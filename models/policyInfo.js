'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyInfoSchema = new Schema({
    policyNumber: {
        type: number,
        required: true,
    },
    policyStartDate: {
        type: string,
        required: true,
    },
    policyEndDate: {
        type: string,
        required: true,
    },
    policyCategory: {
        type: string,
        required: true,
    },

    collectionId: {
        type: string,
        required: true,
    },
    companyCollectionId: {
        type: string,
        required: true,
    },
    userId: {
        type: string,
        required: true,
    },
});

mongoose.model('PolicyInfo', PolicyInfoSchema);


'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyCarrierSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    }
});

mongoose.model('PolicyCarrier', PolicyCarrierSchema);

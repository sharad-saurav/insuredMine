'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    agentName: {
        type: String,
        required: true,
    }
});

mongoose.model('Agent', AgentSchema);
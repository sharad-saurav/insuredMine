'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicyCategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    }
});

mongoose.model('PolicyCategory', PolicyCategorySchema);

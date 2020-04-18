'use strict'

var mongoose = require('mongoose');

var Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

require('../models/message');
const Message = mongoose.model('Message');

function saveMessage(data){
    return new Promise(function (resolve, reject) {
        const saveMessage = new Message();
        saveMessage._id = data.date + ":" + data.time;
        saveMessage.message = data.message;
        saveMessage.save();
    })
};

var toExport = {
    saveMessage
};
module.exports = toExport;
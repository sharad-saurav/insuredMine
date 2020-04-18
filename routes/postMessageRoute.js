var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const postMessageService = require('../services/postMessageService');

router.post('', function(req, res) {
    console.log(req.body)
    var data = req.body;
    postMessageService.saveMessage(data).then(res => {
        res.status(200).send(res);
    }).catch(err => {
        res.status(400).send(err);
    });
});

module.exports = router;
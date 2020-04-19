const express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var async = require("async");
var router = express.Router();
require('../models/userRoles');
require('../models/user');
require('../models/agent');
require('../models/message');
require('../models/policyCarrier');
require('../models/policyCategory');
require('../models/policyInfo');
require('../models/userAccount');

const workerPool = require('../services/workerPool');

var fileupload = require('express-fileupload');
router.use(fileupload());

router.post('/uploadCsv', function(req, res) {
  const file = req.files.hello;
  console.log(file);
  var path = __dirname + '/uploads/' + file.name;
  file.mv(__dirname + '/uploads/' + file.name, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      const csv=require('csvtojson')
      csv()
      .fromFile(path)
      .then((parsedData)=>{
        workerPool.executeTask(parsedData)
            .then(() => {
              res.send({});
            })
      })
    }
  })
})

module.exports = router;

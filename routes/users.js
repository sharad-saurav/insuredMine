const express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
require('../models/userRoles');
require('../models/user');
const userService = require('../services/userService');
const User = mongoose.model('User');
const UserRoles = mongoose.model('UserRoles');
var fileupload = require('express-fileupload');
router.use(fileupload());

router.post('/uploadCsv', function(req, res) {
  const file = req.files.hello;
  console.log(file);
  file.mv(__dirname + '/uploads/' + file.name, function(err, result) {
    if(err) {
      res.send(err);
    }else{
    res.send({
     success: true,
     message: "File uploaded!"
    })
    };
   })
})
module.exports = router;

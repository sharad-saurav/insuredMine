var express = require('express');
const app = express();
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
  console.log('hit')
  const file = req.files.file;
  console.log(file)
 file.mv('./uploads/' + file.name, function(err, result) {
  if(err) 
   throw err;
  res.send({
   success: true,
   message: "File uploaded!"
  });
 })
})

router.get('/users', function(req, res) {
  User.find({}).exec().then(data =>{
    console.log(data);
    res.status(200).send(data);
  })
})

router.get('/userRoles', function(req, res) {
  UserRoles.find({}).exec().then(data =>{
    console.log(data);
    res.status(200).send(data);
  })
})

router.delete('/deleteUserRoles', function(req, res) {
  UserRoles.find({}).remove().exec().then(data =>{
    res.status(200).send();
  }).catch(err =>{
    res.status(400).send(err);
  })
})

router.delete('/deleteUsers', function(req, res) {
  User.find({}).remove().exec().then(data =>{
    res.status(200).send();
  }).catch(err =>{
    res.status(400).send(err);
  })
})
module.exports = router;

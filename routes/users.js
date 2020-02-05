var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
require('../models/userRoles');
require('../models/user');
const userService = require('../services/userService');
const User = mongoose.model('User');
const UserRoles = mongoose.model('UserRoles');

router.post('/register', function(req, res) {
  console.log(req.body)
  var data = req.body;
  userService.registerUser(data).then(registeredUser => {
    res.status(200).send(registeredUser);
  }).catch(err => {
      res.status(400).send(err);
  });
});

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

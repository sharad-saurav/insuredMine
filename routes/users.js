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
var Promise = require('promise');

const userService = require('../services/userService');
const User = mongoose.model('User');
const Agent = mongoose.model('Agent');
const PolicyCategory = mongoose.model('PolicyCategory');
const PolicyCarrier = mongoose.model('PolicyCarrier');
const UserAccount = mongoose.model('UserAccount');
const PolicyInfo = mongoose.model('PolicyInfo');
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
      .then((jsonObj)=>{
        async.each(jsonObj, function (data, callback) {

          var promise = new Promise(function(resolve, reject){
            var agent = new Agent({agentName: data.agent});
            var userObj = {};
            userObj['firstname'] = data.firstname;
            userObj['dob'] = data.dob;
            userObj['address'] = data.address;
            userObj['phone'] = data.phone;
            userObj['state'] = data.state;
            userObj['gender'] = data.gender;
            userObj['email'] = data.email;
            userObj['userType'] = data.userType;

            var policyInfoObj = {};
            policyInfoObj['policyNumber'] = data.policy_number;
            policyInfoObj['policyStartDate'] = data.policy_start_date;
            policyInfoObj['policyEndDate'] = data.policy_end_date;
            policyInfoObj['policyCategory'] = data.category_name;

            var user = new User(userObj);
            
            var policyCategory = new PolicyCategory({categoryName:data.category_name});

            var policyCarrier = new PolicyCarrier({companyName: data.company_name});

            var userAccount = new UserAccount({accountName: data.account_name});

            var globalObj = {};
            var error = {"value": "", "status": false};
            
            agent.save(function(err, data){
              if(err){
                error.status = true;
                error.value = err;
              }else{
                globalObj['agentId'] = data._id;
                policyInfoObj.collectionId = data._id;
              }
            }) 

            policyCarrier.save(function(err, data){
              if(err){
                error.status = true;
                error.value = err;
              }else{
                globalObj['policyCarrierId'] = data._id;
                policyInfoObj.companyCollectionId = data._id;
              }
            }) 
            policyCategory.save(function(err, data){
              if(err){
                error.status = true;
                error.value = err;
              }else{
                globalObj['policyCategoryId'] = data._id;
              }
            }) 
            user.save(function(err, userData){
              if(err){
                error.status = true;
                error.value = err;
              } else {
                userAccount.userId = userData._id;
                console.log("userData._id--------",userData._id);
                policyInfoObj.userId = userData._id;
                userAccount.save(function(err, userAccountData){
                  if(err){
                    error.status = true;
                    error.value = err;
                  } else {
                    globalObj['userAccountId'] = userAccountData._id;
                  }
                })
              }
            }) 
            if(error.status){
              console.log("error.value------",error.value)
              reject(error.value);
            }else{
              resolve(policyInfoObj.userId);
            }
          }) 
          promise.then(function (temp){
            console.log("policyInfoObj----------",temp);
            var policyInfo = new PolicyInfo(temp);
            policyInfo.save(function(err, data){
              if(err){
                callback(err);
              }else{
                console.log('data-----',data);
                callback()
              }
            }) 
          }).catch(function(err){
            callback(err);
          })
        }, function (err) {
          if (err) {
            console.log("err6-----------------",err);
            res.status(400).send(err);
          } else {
            res.status(200).send("success");
          }
        })
      })
    }
  })
})
module.exports = router;

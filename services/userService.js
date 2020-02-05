'use strict'

var mongoose = require('mongoose');
require('../models/userRoles');
require('../models/user');
const User = mongoose.model('User');
const UserRoles = mongoose.model('UserRoles');
var Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);

/**
 * This returns the attendance data for students for a date
 *
 * @param {Date} date
 * @param {any} studentIds
 * @returns
 */

    function registerUser(data){
        return new Promise(function (resolve, reject) {
            User.find({}).exec().then(users =>{
                if(users.length != 0){
                    data.auth = "member"
                }else{
                    data.auth = "admin"
                }
                var user = new User();
                var userRoles = new UserRoles();
                user.name = data.name;
                user.password = data.password;
                user.email = data.email;
                user.save(function(err, savedData){
                    if(err){
                        reject(err);
                    }else{
                        userRoles.auth = data.auth;
                        userRoles.userId = savedData._id
                        userRoles.save(function(err){
                            if(err) {
                                reject(err);
                            } else {
                                resolve(data);
                            }
                        })
                    }
                })
            })
        })
    };

    var toExport = {
        registerUser
    };
    module.exports = toExport;
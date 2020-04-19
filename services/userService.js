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

function saveData(data) {
    var agent = new Agent({agentName: data.agent});
    var agentPromise = agent.save();


    var userObj = {};
    userObj['firstname'] = data.firstname;
    userObj['dob'] = data.dob;
    userObj['address'] = data.address;
    userObj['phone'] = data.phone;
    userObj['state'] = data.state;
    userObj['gender'] = data.gender;
    userObj['email'] = data.email;
    userObj['userType'] = data.userType;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;
    userObj['firstname'] = data.firstname;

    var user = new User(userObj);
    var userPromise = user.save();

    var policyCategory = new PolicyCategory({categoryName: data.category_name});
    var policyCategoryPromise = policyCategory.save();

    var policyCarrier = new PolicyCarrier({companyName: data.company_name});
    var policyCarrrierPromise = policyCarrier.save();


    Promise.all([policyCarrrierPromise, policyCategoryPromise, userPromise, agentPromise])
        .then((values) => {
            var userAccount = new UserAccount({accountName: data.account_name});
            userAccount.userId = values[2]._id;
            var userAccountPromise = userAccount.save();

            var policyInfoObj = {};
            policyInfoObj['policyNumber'] = data.policy_number;
            policyInfoObj['policyStartDate'] = data.policy_start_date;
            policyInfoObj['policyEndDate'] = data.policy_end_date;
            policyInfoObj['policyCategory'] = data.category_name;
            policyInfoObj.policyCategory = values[1]._id;
            policyInfoObj.collectionId = values[3]._id;
            policyInfoObj.companyCollectionId = values[0]._id;
            policyInfoObj.userId = values[2]._id;

            var policyInfoPromise = new PolicyInfo(policyInfoObj).save();

            Promise.all([userAccountPromise, policyInfoPromise])
                .then((values) => {
                    console.log("all done")
                })
        })
}

var toExport = {
    saveData
}
module.exports = toExport;
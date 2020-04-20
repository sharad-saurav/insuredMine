
const userService = require("./userService");


var workerpool = require('workerpool');
var pool = workerpool.pool();

function executeTask(inputDatas) {

    //return userService.saveData(inputDatas[0])

    console.log("send ");
    return new Promise((resolve, reject) => {
            pool.exec(userService.saveData, inputDatas)
                .then(function (result) {
                    console.log('result', result); // outputs 7
                })
                .catch(function (err) {
                    console.error(err);
                })
                .then(function () {
                    pool.terminate(); // terminate all workers when done
                });
    })
}

var toExport = {
    executeTask
};
module.exports = toExport;
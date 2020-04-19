
const userService = require("./userService");

const { StaticPool } = require("node-worker-threads-pool");

const saveData = userService.saveData.bind(userService)

const pool = new StaticPool({
    size: 4,
    task: function(data) {
        console.log("got a data to save", JSON.stringify(data))
        saveData(data)
    }
});

function executeTask(inputDatas) {
    console.log("send ");
    return new Promise((resolve, reject) => {
        inputDatas.forEach(inputData => {
            (async () => {
                await pool.exec(inputData);
            })();
        });
    })
}

var toExport = {
    executeTask
};
module.exports = toExport;
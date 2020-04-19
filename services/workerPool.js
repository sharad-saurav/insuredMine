
const { StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
    size: 4,
    task: function(n) {
        console.log(n)
    }
});

for (let i = 0; i < 20; i++) {
    console.log("send ", i);
    (async () => {
        await pool.exec(i);

    })();
}

function executeTask(data) {
    console.log("send ", data);

    // iterate over data 
    (async () => {
        await pool.exec(data);

    })();
}

var toExport = {
    executeTask
};
module.exports = toExport;

const { StaticPool } = require("node-worker-threads-pool");

const pool = new StaticPool({
    size: 4,
    task: function(n) {
        console.log(n)
    },
    workerData: {
        num: 5,
    },
});

for (let i = 0; i < 20; i++) {
    console.log("send ", i);
    (async () => {
        await pool.exec(i);

    })();
}
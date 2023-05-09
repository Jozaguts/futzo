module.exports = {
    apps: [
        {
            name: "futzo",
            exec_mode: "cluster",
            instances: "max",
            script: "./server/index.mjs",
        },
    ],
};

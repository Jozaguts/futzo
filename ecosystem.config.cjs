module.exports = {
    apps: [
        {
            name: 'futzo',
            port: '3000',
            exec_mode: 'fork',
            script: '.output/server/index.mjs',
            env: {
                NODE_ENV: 'production',
            },
        }
    ]
}

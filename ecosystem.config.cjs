module.exports = {
    apps: [
        {
            name: 'futzo',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './server/index.mjs',
            env: {
                NODE_ENV: 'production',
            },
        }
    ]
}

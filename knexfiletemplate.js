const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
    client: 'pg',
    migrations: {
        directory: './db/migrations',
    },
    seeds: {
        directory: './db/seeds',
    },
};

const customConfigs = {
    development: {
        connection: {
            database: 'project',
            username: '//',
            password: '//'
        },
    },
    test: {
        connection: {
            database: 'project_test',
            username: '//',
            password: '//'
        },
    },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };

module.exports = {
    development: {
        database: 'array',
        username: 'root',
        password: '92629', 
        config: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    }
}
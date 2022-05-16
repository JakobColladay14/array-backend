module.exports = {
    development: {
        database: 'array',
        username: 'user',
        password: 'db_password', 
        config: {
            host: 'db',
            port: 3306,
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
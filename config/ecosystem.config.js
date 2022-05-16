module.exports = {
  apps : [{
    name   : "array-backend",
    script : "app.js",
    exec_mode: 'cluster',
    instances: 2,
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}

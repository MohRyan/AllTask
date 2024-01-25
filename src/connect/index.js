const {
    Pool
} = require('pg')


const dbPool = new Pool({
    user: 'postgres',
    database: 'dataBlog',
    password: '085321',
    port: 5432
})


module.exports = dbPool
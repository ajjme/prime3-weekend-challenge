const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'todolist',
    server: 'localhost',
    port: 5432,
    max: 5,
    idleTimeoutMillis: 5000
};

module.exports = new Pool(config);
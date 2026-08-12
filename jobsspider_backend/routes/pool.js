const mysql = require('mysql');

const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'defaultdb',
    multipleStatements: true,
    connectionLimit: 100
};

if (process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost')) {
    poolConfig.ssl = { rejectUnauthorized: false };
}

var pool = mysql.createPool(poolConfig);
module.exports = pool;
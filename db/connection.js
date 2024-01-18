const mysql = require(`mysql2/promise`);
const {DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD} = process.env;

let pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

module.exports = async function () {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        throw error;
    }
};
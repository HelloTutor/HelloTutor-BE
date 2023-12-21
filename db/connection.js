const mysql = require("mysql2/promise");

let pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "hellotutor",
    password: "0000",
    database: "HELLOTUTOR"
});

module.exports = async function () {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        throw error;
    }
};


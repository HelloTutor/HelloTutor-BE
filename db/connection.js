const mysql = require(`mysql2/promise`);

let pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "hellotutor",
    password: "0000",
    database: "HELLOTUTOR"
});

let mySqlConnection = async function () {
    try {
        const connection = await pool.getConnection();
        console.log("mySql 연동 성공");
        return connection;
    } catch (error) {
        console.log("msSql 에러", error);
    }
}

module.exports = {
    mySqlConnection
}
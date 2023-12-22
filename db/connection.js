const db = require(`mysql2/promise`);

let pool = mysql.createPool({
    host: "localhost",
    user: "hellotutor",
    password: "0000",
    database: "HELLOTUTOR"
});


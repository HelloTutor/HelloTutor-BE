const connection = require("../db/connection");

const query = {
    findGoogleId: "SELECT * FROM tb_tutee WHERE google_id = ?",
    insertGoogleId: "INSERT INTO tb_tutee(`google_id`) VALUES(?)"
}

async function findTuteeGoogleId (profile) {
    try {
        const conn = await connection ();
        const [[row]] = await conn.execute(query.findGoogleId);
        console.log("find row를 알아보자", row);
        return row;
    } catch (err) {
        console.log(err);
    }
}

async function insertTuteeGoogleId (profile) {
    try {
        const conn = connection();
        const [row] = await conn.execute(query.insertGoogleId);
        console.log("insert row를 알아보자", row);
        return row;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    findTuteeGoogleId,
    insertTuteeGoogleId
}
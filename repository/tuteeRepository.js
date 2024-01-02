const connection = require("../db/connection");
const userRepository = require("./userRepository");

const query = {
    insertTutee: "INSERT INTO tb_tutee(`id`) VALUES (?)",
    findTuteeId: "SELECT * FROM tb_tutee WHERE id = ?",
}

async function insertOauthTutee(profile) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(userRepository.query.insertOauthUser, [profile.emails[0].value, profile.displayName, 0]);
        console.log("row를 알아보자", row);

        if (profile.provider === "google") {
            const google_row = await conn.execute(query.insertGoogleId, [row.insertId, profile.id]);
            return google_row;
        }
    } catch(error) {
        console.log(error);
    }
}

async function findTuteeId(id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.findTuteeId, [id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    query,
    insertOauthTutee,
    findTuteeId
}
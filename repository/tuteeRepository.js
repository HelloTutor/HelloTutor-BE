const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertOauthTutee(profile) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.user.insert, [profile.emails[0].value, null, profile.displayName, 0]);

        if (profile.provider === "google") {
            const google_row = await conn.execute(query.tutee.insert, [row.insertId, profile.id]);

            return google_row;
        }
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function findTuteeId(id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.tutee.findById, [id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {
    insertOauthTutee,
    findTuteeId
}
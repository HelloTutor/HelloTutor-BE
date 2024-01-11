const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertOauthTutee(profile) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.user.insert, [profile.emails[0].value, null, profile.displayName, 0]);

        if (profile.provider === "google") {
            const google_row = await conn.execute(query.tutee.insert, [row.insertId, profile.id]);

            return google_row;
        }
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function findTuteeId(id) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.tutee.findById, [id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertOauthTutee,
    findTuteeId
}
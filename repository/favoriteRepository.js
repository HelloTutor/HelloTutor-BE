const query = require("../db/query.json");
const connection = require("../db/connection");

async function selectTutorFavorite(token, tutorId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.favorite.select, [token.id, tutorId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

async function insertTutorFavorite(token, tutorId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.favorite.insert, [token.id, tutorId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

async function deleteTutorFavorite(token, tuteeId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.favorite.delete, [token.id, tuteeId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    selectTutorFavorite,
    insertTutorFavorite,
    deleteTutorFavorite
}
const query = require("../db/query.json");
const connection = require("../db/connection");

async function selectTutorFavorite(user, tutorId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.favorite.select, [user.id, tutorId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

async function insertTutorFavorite(user, tutorId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.favorite.insert, [user.id, tutorId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

async function deleteTutorFavorite(user, tutorId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.favorite.delete, [user.id, tutorId]);

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
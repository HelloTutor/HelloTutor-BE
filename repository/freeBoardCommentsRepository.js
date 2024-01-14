const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoardComments(token, freeBoardId, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.insert, [token.id, freeBoardId, body.content]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateFreeBoardComments(token, freeBoardId, commentId, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.update, [body.content, commentId, freeBoardId, token.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFreeBoardComments(commentId, freeBoardId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.freeBoardComments.select, [commentId, freeBoardId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteFreeBoardComments(commentId, freeBoardId, token) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.delete, [commentId, freeBoardId, token.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllFreeBoardComments(freeBoardId, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.selectAll, [freeBoardId, offset, pageSize]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertFreeBoardComments,
    updateFreeBoardComments,
    selectFreeBoardComments,
    deleteFreeBoardComments,
    selectAllFreeBoardComments
}
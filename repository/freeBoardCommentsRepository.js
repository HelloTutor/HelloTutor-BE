const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoardComments(token, free_board_id, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.insert, [token.id, free_board_id, body.content]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateFreeBoardComments(token, free_board_id, comment_id, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.update, [body.content, comment_id, free_board_id, token.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFreeBoardComments(comment_id, free_board_id) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.freeBoardComments.select, [comment_id, free_board_id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteFreeBoardComments(comment_id, free_board_id, token) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.delete, [comment_id, free_board_id, token.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllFreeBoardComments(free_board_id, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.selectAll, [free_board_id, offset, pageSize]);

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
const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoardComments(user, freeBoardId, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.insert, [user.id, freeBoardId, body.content]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateFreeBoardComments(user, freeBoardId, commentId, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.update, [body.content, commentId, freeBoardId, user.id]);

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

async function deleteFreeBoardComments(commentId, freeBoardId, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.delete, [commentId, freeBoardId, user.id]);

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
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.freeBoardComments.selectAllCount, [freeBoardId]);
        const [row] = await conn.execute(query.freeBoardComments.selectAll, [freeBoardId, offset, pageSize]);
        await conn.commit();
        const pagination = {
            contents: row,
            totalCount: totalCount
        }

        return pagination;
    } catch(error) {
        conn?.rollback();
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
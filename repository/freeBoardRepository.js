const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoard(user, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoard.insert, [user.id, body.title, body.content, body.content_json]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFreeBoard(postId) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        await conn.execute(query.freeBoard.updateViews, [postId]);
        const [[row]] = await conn.execute(query.freeBoard.select, [postId]);
        await conn.commit();

        return row;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateFreeBoard(user, postId, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoard.update, [body.title, body.content, body.content_json, postId, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}



async function deleteFreeBoard(postId, user) {
    console.log(postId,token);
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoard.delete, [postId, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateFreeBoardViews(views, postId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.freeBoard.updateViews, [views, postId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllFreeBoard(offset, limit) {
    let conn;
    try {
        conn = await connection();
        conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.freeBoard.selectAllCount);
        const [row] = await conn.execute(query.freeBoard.selectAll, [offset, limit]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSearchFreeBoard(search, offset, limit) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.freeBoard.selectSearchCount, [search]);
        const [row] = await conn.execute(query.freeBoard.selectSearch, [search, offset, limit]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        await conn.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertFreeBoard,
    selectFreeBoard,
    updateFreeBoard,
    deleteFreeBoard,
    updateFreeBoardViews,
    selectAllFreeBoard,
    selectSearchFreeBoard
}
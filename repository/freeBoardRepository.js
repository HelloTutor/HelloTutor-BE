const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoard(token, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.insert, [token.id, body.title, body.content]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function selectFreeBoard(post_id) {
    const conn = await connection();
    try {
        await conn.beginTransaction();
        await conn.execute(query.freeBoard.updateViews, [post_id]);
        const [[row]] = await conn.execute(query.freeBoard.select, [post_id]);
        await conn.commit();

        return row;
    } catch (error) {
        await conn.rollback();
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function updateFreeBoard(token, post_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.update, [body.title, body.content, post_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteFreeBoard(token, post_id) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.delete, [post_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function updateFreeBoardViews(views, post_Id) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.updateViews, [views, post_Id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function selectAllFreeBoard(offset, limit) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.selectAll, [offset, limit]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function selectSearchFreeBoard(search, offset, limit) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoard.selectSearch, [search, offset, limit]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
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
const connection = require("../db/connection");
const query = require("../db/query.json");

async function insert(token, freeBoardId, freeBoardComments) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.like.insert, [token.id, freeBoardId, freeBoardComments]);
        console.log(row);
        return row;
    } catch(error) {
        throw error;
    } finally {
        conn.release();
    }
};

async function selectFreeBoardLike(freeBoardId, user){
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.like.selectFreeBoard, [freeBoardId, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteFreeBoardLike(user, freeBoardId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.like.deleteFreeBoard, [user.id, freeBoardId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectFreeBoardCommentsLike(token, freeBoardCommentsId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.like.selectFreeBoardComments, [token.id, freeBoardCommentsId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteFreeBoardCommentsLike(token, freeBoardCommentsId) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.like.deleteFreeBoardComments, [token.id, freeBoardCommentsId]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insert,
    selectFreeBoardLike,
    deleteFreeBoardLike,
    selectFreeBoardLike,
    selectFreeBoardCommentsLike,
    deleteFreeBoardCommentsLike
}
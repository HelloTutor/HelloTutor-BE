const connection = require("../db/connection");
const query = require("../db/query.json");

async function insert(token, free_board_id, free_board_comments) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.like.insert, [token.id, free_board_id, free_board_comments]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
};

async function selectFreeBoardLike(free_board_id, token){
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.like.selectFreeBoard, [free_board_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteFreeBoardLike(token, free_board_id) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.like.deleteFreeBoard, [token.id, free_board_id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function selectFreeBoardCommentsLike(token, free_board_comments_id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.like.selectFreeBoardComments, [token.id, free_board_comments_id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
    }
}

async function deleteFreeBoardCommentsLike(token, free_board_comments_id) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.like.deleteFreeBoardComments, [token.id, free_board_comments_id]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        conn.release();
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
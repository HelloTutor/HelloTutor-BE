const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertFreeBoardComments(token, free_board_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.insert, [token.id, free_board_id, body.content]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function updateFreeBoardComments(token, free_board_id, comment_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.update, [body.content, comment_id, free_board_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function selectFreeBoardComments(comment_id, free_board_id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.freeBoardComments.select, [comment_id, free_board_id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function deleteFreeBoardComments(comment_id, free_board_id, token) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.delete, [comment_id, free_board_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function selectAllFreeBoardComments(free_board_id, offset, limit) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.freeBoardComments.selectAll, [free_board_id, offset, limit]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    insertFreeBoardComments,
    updateFreeBoardComments,
    selectFreeBoardComments,
    deleteFreeBoardComments,
    selectAllFreeBoardComments
}
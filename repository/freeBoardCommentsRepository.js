const connection = require("../db/connection");

const query = {
    insertFreeBoardComments: "INSERT INTO tb_free_board_comments (`user_id`, `free_board_id`, `content`) VALUES(?, ?, ?)",
    updateFreeBoardComments: "UPDATE tb_free_board_comments SET `content` = ? WHERE id = ? AND free_board_id = ? AND user_id = ?",
    selectFreeBoardComments: "SELECT * FROM tb_free_board_comments AS f, tb_user AS u WHERE f.user_id = u.id AND f.id = ?",
}

async function insertFreeBoardComments(token, free_board_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertFreeBoardComments, [token.id, free_board_id, body.content]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function updateFreeBoardComments(token, free_board_id, comment_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.updateFreeBoardComments, [body.content, comment_id, free_board_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function selectFreeBoardComments(comment_id) {
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.selectFreeBoardComments, [comment_id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    insertFreeBoardComments,
    updateFreeBoardComments,
    selectFreeBoardComments,
}
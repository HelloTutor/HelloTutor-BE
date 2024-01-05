const connection = require("../db/connection");

const query = {
    insertFreeBoard: "INSERT INTO tb_free_board (`user_id`, `title`, `content`) VALUES (?, ?, ?)",
    selectFreeBoardPost: "SELECT * FROM tb_free_board AS f, tb_user AS u WHERE f.user_id = u.id AND f.id = ?",
    updateFreeBoardPost: "UPDATE tb_free_board SET `title` = ?, `content` = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
    deleteFreeBoardPost: "DELETE FROM tb_free_board WHERE id = ? AND user_id = ?"
}

async function insertFreeBoard(token, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.insertFreeBoard, [token.id, body.title, body.content]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function selectFreeBoardPost(post_id) { //좋아요, 댓글 기능 구현후 수정할 것
    try {
        const conn = await connection();
        const [[row]] = await conn.execute(query.selectFreeBoardPost, [post_id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function updateFreeBoardPost(token, post_id, body) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.updateFreeBoardPost, [body.title, body.content, post_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

async function deleteFreeBoardPost(token, post_id) {
    try {
        const conn = await connection();
        const [row] = await conn.execute(query.deleteFreeBoardPost, [post_id, token.id]);

        return row;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    insertFreeBoard,
    selectFreeBoardPost,
    updateFreeBoardPost,
    deleteFreeBoardPost
}
const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertQuestionBoard(token, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.insert, [token.id, body.title, body.content]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    insertQuestionBoard,
}
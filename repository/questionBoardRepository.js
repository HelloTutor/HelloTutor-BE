const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertQuestionBoard(user, subject, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.insert, [user.id, subject, body.title, body.content]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectQuestionBoard(postId, subject) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        await conn.execute(query.questionBoard.updateViews, [postId, subject]);
        const [[row]] = await conn.execute(query.questionBoard.select, [postId, subject]);
        await conn.commit();

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateQuestionBoard(body, postId, subject, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.update, [body.title, body.content, postId, subject, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteQuestionBoard(postId, subject, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.delete, [postId, subject, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllQuestionBoard(subject, offset, limit){
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.selectAll, [subject, offset, limit]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectSearchQuestionBoard(subject, search, offset, limit) {
    let conn;
    try{
        conn = await connection();
        const[row] = await conn.execute(query.questionBoard.selectSearch, [subject, search, offset, limit]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}
module.exports = {
    insertQuestionBoard,
    selectQuestionBoard,
    updateQuestionBoard,
    deleteQuestionBoard,
    selectAllQuestionBoard,
    selectSearchQuestionBoard
}
const connection = require("../db/connection");
const query = require("../db/query.json");

async function insertQuestionBoard(user, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.insert, [user.id, body.subject, body.title, body.content]);

        return row;
    } catch(error) {
        console.log(error);
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectQuestionBoard(postId) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        await conn.execute(query.questionBoard.updateViews, [postId]);
        const [[row]] = await conn.execute(query.questionBoard.select, [postId]);
        await conn.commit();

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateQuestionBoard(body, postId, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.update, [body.subject, body.title, body.content, postId, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteQuestionBoard(postId, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.questionBoard.delete, [postId, user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectAllQuestionBoard(offset, limit){
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.questionBoard.totalCount);
        const [row] = await conn.execute(query.questionBoard.selectAll, [offset, limit]);
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

async function selectAllSearchQuestionBoard(search, offset, limit) {
    let conn;
    try{
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.questionBoard.searchTotalCount, [search]);
        const[row] = await conn.execute(query.questionBoard.selectAllSearch, [search, offset, limit]);
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

async function selectAllSubjectQuestionBoard(subject, offset, limit) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.questionBoard.subjectTotalCount, [subject]);
        const [row] = await conn.execute(query.questionBoard.subjectAll, [subject, offset, limit]);
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

async function selectAllSubjectSearchQuestionBoard(subject, search, offset, limit) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.questionBoard.subjectSearchTotalCount, [subject, search]);
        const [row] = await conn.execute(query.questionBoard.subjectAllSearch, [subject, search, offset, limit]);
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
    insertQuestionBoard,
    selectQuestionBoard,
    updateQuestionBoard,
    deleteQuestionBoard,
    selectAllQuestionBoard,
    selectAllSearchQuestionBoard,
    selectAllSubjectQuestionBoard,
    selectAllSubjectSearchQuestionBoard
}
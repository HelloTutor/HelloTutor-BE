const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectMyPageSetting(user) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.myPage.select, [user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateMyPageSetting(body, user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.myPage.update, [body.nickname, body.phone, user.id]);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function deleteMyPageSetting(user) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.myPage.delete, [user.id]);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectMyPageAllQuestion(user, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.myPage.selectAllQuestionCount, [user.id]);
        const [row] = await conn.execute(query.myPage.selectAllQuestion, [user.id, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectMyPageAllFavorite(user, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.myPage.selectAllFavoriteCount, [user.id]);
        const [row] = await conn.execute(query.myPage.selectAllFavorite, [user.id, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectMyPageAllFree(user, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.myPage.selectAllFreeCount, [user.id]);
        const [row] = await conn.execute(query.myPage.selectAllFree, [user.id, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectMyPageAllFreeComment(user, offset, pageSize) {
    let conn;
    try {
        conn = await connection();
        await conn.beginTransaction();
        const [[{ totalCount }]] = await conn.execute(query.myPage.selectAllFreeCommentCount, [user.id]);
        const [row] = await conn.execute(query.myPage.selectAllFreeComment, [user.id, offset, pageSize]);
        await conn.commit();
        const pageNation = {
            contents: row,
            totalCount: totalCount
        }

        return pageNation;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function selectMyPageTutorInfo(user) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.myPage.selectTutorInfo, [user.id]);

        return row;
    } catch(error) {
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

async function updateMyPageTutorInfo(user, body) {
    let conn;
    try {
        conn = await connection();
        const [row] = await conn.execute(query.myPage.updateTutorInfo, [
            body.introduce,
            body.detailed_description,
            body.career,
            body.service_price,
            body.subject,
            body.experience,
            user.id
        ]);

        return row;
    } catch(error) {
        conn?.rollback();
        throw error;
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    selectMyPageSetting,
    updateMyPageSetting,
    deleteMyPageSetting,
    selectMyPageAllQuestion,
    selectMyPageAllFavorite,
    selectMyPageAllFree,
    selectMyPageAllFreeComment,
    selectMyPageTutorInfo,
    updateMyPageTutorInfo
}
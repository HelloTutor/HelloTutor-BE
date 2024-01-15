const connection = require("../db/connection");
const query = require("../db/query.json");

async function selectTutor(tutorId) {
    let conn;
    try{
        conn = await connection();
        const [[row]] = await conn.execute(query.tutorBoard.select, [tutorId]);

        return row;
    } catch(error) {
        console.log(error);
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

async function selectTutorInfo(tutorId) {
    let conn;
    try {
        conn = await connection();
        const [[row]] = await conn.execute(query.tutorBoard.selectInfo, [tutorId]);

        return row;
    } catch(error) {
        throw(error);
    } finally {
        if(conn) conn.release();
    }
}

module.exports = {
    selectTutorInfo,
    selectTutor
}
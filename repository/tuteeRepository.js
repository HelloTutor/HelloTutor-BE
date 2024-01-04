const connection = require("../db/connection");

const query = require('../db/query');

async function insertOauthTutee(profile) {
  try {
    const conn = await connection();
    const [row] = await conn.execute(query.user.insert, [profile.emails[0].value, null, profile.displayName, 0]);
    console.log("row를 알아보자", row);

    if (profile.provider === "google") {
      const google_row = await conn.execute(query.tutee.insert, [row.insertId, profile.id]);
      return google_row;
    }
  } catch (error) {
    console.log(error);
  }
}

async function findTuteeId(id) {
  try {
    const conn = await connection();
    const [[row]] = await conn.execute(query.tutee.findById, [id]);

    return row;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  insertOauthTutee,
  findTuteeId
}
const connection = require("../db/connection");

const query = {
    insertTutor: "INSERT INTO tb_tutor(`id`) VALUES (?)",
}

module.exports = {
    query
}
const authorization = require("../middleware/authorization");
const questionBoard = require("../repository/questionBoardRepository");
const { ACCESS_PRIVATE_KEY } = process.env;

async function insertQuestionBoard(req, res) {
    try{
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );

        if (decodedToken) {
            const { body } = req;
            const row = await questionBoardRepository.insertQuestionBoard(decodedToken, body);

            if (row.affectedRow === 1) {
                return res.status(200).json({ message: "질문 작성 완료" });
            }
        } else {
            return res.status(500).json({ message: "질문 권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}
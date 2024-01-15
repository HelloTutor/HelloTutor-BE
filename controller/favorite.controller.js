const authorization = require("../middleware/authorization");
const favoriteRepository = require("../repository/favoriteRepository");
const { ACCESS_PRIVATE_KEY } = process.env;

async function favorite(req, res) {
    try{
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );
        const { tutorId } = req.params;

        if (decodedToken.id === tutorId) {
            return res.status(400).json({ message: "나에게는 찜할 수 없습니다." });
        }

        const selectRow = await favoriteRepository.selectTutorFavorite(decodedToken, tutorId);

        if (selectRow === undefined) {
            const insertRow = await favoriteRepository.insertTutorFavorite(decodedToken, tutorId);

            if (insertRow.affectedRows === 1) {
                return res.status(200).json({ message: "찜하기 완료" });
            }
        }

        if (selectRow.user_id === decodedToken.id) {
            const deleteRow = await favoriteRepository.deleteTutorFavorite(decodedToken, tutorId);

            if (deleteRow.affectedRows === 1) {
                return res.status(200).json({ message: "찜하기 취소 완료" });
            }
        } else {
            return res.status(500).json({ message: "찜하기 취소 권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    favorite
}
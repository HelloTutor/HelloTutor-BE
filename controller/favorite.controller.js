const favoriteRepository = require("../repository/favoriteRepository");

async function favorite(req, res) {
    try{
        const { params: { tutorId }, user } = req;

        if (user.id === tutorId) {
            return res.status(400).json({ message: "나에게는 찜할 수 없습니다." });
        }

        const selectRow = await favoriteRepository.selectTutorFavorite(user, tutorId);

        if (!selectRow) {
            const insertRow = await favoriteRepository.insertTutorFavorite(user, tutorId);

            if (insertRow.affectedRows === 1) {
                return res.status(200).json({ message: "찜하기 완료" });
            }
        } else {
            const deleteRow = await favoriteRepository.deleteTutorFavorite(user, tutorId);

            if (deleteRow.affectedRows === 1) {
                return res.status(200).json({ message: "찜하기 취소 완료" });
            }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    favorite
}
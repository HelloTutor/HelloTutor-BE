const reviewRepository = require("../repository/reviewRepository");

async function selectAllReview(req, res) {
    try {
        const { tutorId } = req.params;
        let { sort, page, pageSize } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "5";
        }

        const offset = String((page - 1) * pageSize);
        let row;

        if ( sort === "lowScore" ) {
            row = await reviewRepository.selectLowScore(tutorId, offset, pageSize);
        } else if (sort === "highScore" ) {
            row = await reviewRepository.selectHighScore(tutorId, offset, pageSize);
        } else if (sort === undefined) {
            row = await reviewRepository.selectAllReview(tutorId, offset, pageSize);
        } else {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }

        const avgCount = await reviewRepository.avgCount(tutorId);
        const review = {
            pageNation: row,
            avgCount: { Count: avgCount.allCount, avg: avgCount.avg}
        }

        return res.status(200).json(review);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    selectAllReview
}
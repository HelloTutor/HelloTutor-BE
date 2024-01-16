const tutorBoardRepository = require("../repository/tutorBoardRepository");

async function selectAllTutorBoard(req, res) {
    try {
        const { checkSubject } = req.params;
        let { checkFilter, page, pageSize, search } = req.query;

        console.log("filter", checkFilter, "page", page, "pageSize", pageSize, "search", search);

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if (checkFilter === "review") {
            const row = await tutorBoardRepository.selectReview(checkSubject, offset, pageSize);

            if (search) {
                const row = await tutorBoardRepository.selectReviewSearch(checkSubject, `%${search}%`, offset, pageSize);
                return res.status(200).json(row);
            }

            return res.status(200).json(row);
        }

        if (checkFilter === "avgScore") {
            const row = await tutorBoardRepository.selectAvgScore(checkSubject, offset, pageSize);

            if (search) {
                const row = await tutorBoardRepository.selectAvgScoreSearch(checkSubject, `%${search}%`, offset, pageSize);
                return res.status(200).json(row);
            }

            return res.status(200).json(row);
        }

        if (checkFilter === "answer") {
            const row = await tutorBoardRepository.selectAnswer(checkSubject, offset, pageSize);

            if (search) {
                const row = await tutorBoardRepository.selectAnswerSearch(checkSubject, `%${search}%`, offset, pageSize);
                return res.status(200).json(row);
            }

            return res.status(200).json(row);
        }

        const row = await tutorBoardRepository.selectAll(checkSubject, offset, pageSize);
        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    selectAllTutorBoard
}
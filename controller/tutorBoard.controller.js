const tutorBoardRepository = require("../repository/tutorBoardRepository");

async function selectAllSearch(req, res) {
    try {
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if(search) {
            const row = await tutorBoardRepository.selectAllSearch(`%${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await tutorBoardRepository.selectAll(offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectAllSortSearch(req, res) {
    try {
        const { sort } = req.params;
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        let row;
        switch(sort) {
            case "reviewCount":
                if(search) {
                    row = await tutorBoardRepository.selectSortReviewCountSearch(`%${search}%`, offset, pageSize);
                }
                row = await tutorBoardRepository.selectSortReviewCount(offset, pageSize);
                break;
            case "reviewAvg":
                if(search) {
                    row = await tutorBoardRepository.selectSortReviewAvgSearch(`%${search}%`, offset, pageSize);
                }
                row = await tutorBoardRepository.selectSortReviewAvg(offset, pageSize);
                break;
            case "answerCount":
                if(search) {
                    row = await tutorBoardRepository.selectSortAnswerCountSearch(`%${search}%`, offset, pageSize);
                }
                row = await tutorBoardRepository.selectSortAnswerCount(offset, pageSize);
                break;
        }

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function subjectSearch(req, res) {
    try {
        const { subject } = req.params;
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if(search) {
            const row = await tutorBoardRepository.subjectSearch(JSON.stringify(subject), `%${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await tutorBoardRepository.subject(JSON.stringify(subject), offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function subjectSearchSort(req, res) {
    try {
        const { subject, sort } = req.params;
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        let row;
        switch(sort) {
            case "reviewCount":
                if(search) {
                    row = await tutorBoardRepository.subjectReviewCountSearch(JSON.stringify(subject), `%${search}%`, offset, pageSize);
                }
                row = await tutorBoardRepository.subjectReviewCount(JSON.stringify(subject), offset, pageSize);
                break;
            case "reviewAvg":
                if(search) {
                    row = await tutorBoardRepository.subjectReviewAvgSearch(JSON.stringify(subject), `%${search}%`, offset, pageSize);
                }
                row = await tutorBoardRepository.subjectReviewAvg(JSON.stringify(subject), offset, pageSize);
                break;
            case "answerCount":
                if(search) {
                    row = await tutorBoardRepository.subjectAnswerCountSearch(JSON.stringify(subject), `%${search}`, offset, pageSize);
                }
                row = await tutorBoardRepository.subjectAnswerCount(JSON.stringify(subject), offset, pageSize);
                break;
        }

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    selectAllSearch,
    selectAllSortSearch,
    subjectSearch,
    subjectSearchSort,
}
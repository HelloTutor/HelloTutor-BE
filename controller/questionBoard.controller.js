const questionBoardRepository = require("../repository/questionBoardRepository");
const { NODE_ENV="dev" } = process.env;

async function insertQuestionBoard(req, res) {
    try{
        if (req.user) {
            const { body } = req;
            const row = await questionBoardRepository.insertQuestionBoard(req.user, body);

            if (row.affectedRows === 1) {
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

async function selectQuestionBoard(req, res) {
    try {
        const { postId } = req.params;
        const row = await questionBoardRepository.selectQuestionBoard(postId);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "질문 가져오기 실패 "})
    }
}

async function putQuestionBoard(req, res) {
    try {
        const { user } = req;

        const { postId } = req.params;
        const selectRow = await questionBoardRepository.selectQuestionBoard(postId);
        conso

        if (user.id === selectRow.user_id) {
            const { body } = req;
            const updateRow = await questionBoardRepository.updateQuestionBoard(body, postId, user);

            if(updateRow.affectedRows === 1) {
                res.status(200).json({ message: "질문 수정 완료"});
            }
        } else {
            return res.status(500).json({ message: "질문 수정권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function deleteQuestionBoard(req, res) {
    try {
        const { params: { postId }, user } = req;

        const selectRow = await questionBoardRepository.selectQuestionBoard(postId);

        if (user.id === selectRow.user_id) {
            const deleteRow = await questionBoardRepository.deleteQuestionBoard(postId, user);

            if (deleteRow.affectedRows === 1) {
                res.status(200).json({ message: "질문 삭제 완료" });
            }
        } else {
            res.status(500).json({ message: "질문 삭제권한이 없습니다." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

async function selectAllSearchQuestionBoard(req, res) {
    try {
        let { page, pageSize, search } = req.query;

        if (!page || (page <= 0)) {
            page = 1;
        }

        if(!pageSize || (pageSize <= 0)) {
            pageSize = "10";
        }

        const offset = String((page - 1) * pageSize);

        if (search) {
            const row = await questionBoardRepository.selectAllSearchQuestionBoard(`%${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await questionBoardRepository.selectAllQuestionBoard(offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectSubjectSearchQuestionBoard(req, res) {
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

        if (search) {
            const row = await questionBoardRepository.selectAllSubjectSearchQuestionBoard(subject, `%${search}%`, offset, pageSize);
            return res.status(200).json(row);
        } else {
            const row = await questionBoardRepository.selectAllSubjectQuestionBoard(subject, offset, pageSize);
            return res.status(200).json(row);
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function uploadImage(req, res) {
    try {
        const { files } = req;

        if (files) {
            const links = files.map(file => {
                const filePath = (NODE_ENV === "prd" ? "https://tutor-api.devple.net/questionBoardImage/" : "http://localhost:3000/questionBoardImage/") + file.filename;

                return filePath;
            });

            return res.status(200).json({ filePath: links });
        } else {
            return res.status(400).json({ message: "업로드된 파일이 없습니다." });
        }
    } catch (error) {
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    insertQuestionBoard,
    selectQuestionBoard,
    putQuestionBoard,
    deleteQuestionBoard,
    selectAllSearchQuestionBoard,
    selectSubjectSearchQuestionBoard,
    uploadImage
}
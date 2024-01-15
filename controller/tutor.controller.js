const tutorRepository = require("../repository/tutorRepository");
const authorization = require("../middleware/authorization");

async function selectTutor(req, res) {
    try {
        const { tutorId } = req.params;
        const row = await tutorRepository.selectTutor(tutorId);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        res.status(404).json({ message: "해당 튜터가 없습니다." });
    }
}

async function selectTutorInfo(req, res) {
    try {
        const { tutorId } = req.params;
        const row = await tutorRepository.selectTutorInfo(tutorId);

        return res.status(200).json(row);
    } catch(error) {
        console.log(error);
        res.status(404).json({ message: "해당 정보가 없습니다." });
    }
}

async function favorite(req, res) {
    try{
        const decodedToken = authorization.verifyToken(
            req.headers["authorization"],
            ACCESS_PRIVATE_KEY
        );

        const { tutorId } = req.params;

        
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    selectTutor,
    selectTutorInfo
}
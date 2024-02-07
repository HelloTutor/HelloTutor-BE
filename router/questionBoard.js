const router  = require("express").Router({mergeParams: true});
const token = require("../middleware/token");
const { checkSubject } = require("../middleware/checkSubject");
const questionBoardController = require("../controller/questionBoard.controller");
const boardParser = require("../middleware/boardParser");
const upload = require("../config/multer/multerConfig");

router.get("/", questionBoardController.selectAllSearchQuestionBoard);

router.post("/", token.authorization, boardParser.boardContentParser, questionBoardController.insertQuestionBoard);

router.post("/image", token.authorization, upload.array("questionBoardImage"), questionBoardController.uploadImage);

router.get("/subject/:subject", checkSubject, questionBoardController.selectSubjectSearchQuestionBoard);

router.get("/:postId", questionBoardController.selectQuestionBoard);

router.put("/:postId", token.authorization, boardParser.boardContentParser, questionBoardController.putQuestionBoard);

router.delete("/:postId", token.authorization, questionBoardController.deleteQuestionBoard);

module.exports = router;
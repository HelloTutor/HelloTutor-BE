const router  = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const { checkSubject } = require("../middleware/checkSubject");
const questionBoardController = require("../controller/questionBoard.controller");
const boardParser = require("../middleware/boardParser");

router.get("/", questionBoardController.selectAllSearchQuestionBoard);

router.post("/", authorization.reIssueToken, boardParser.boardContentParser, questionBoardController.insertQuestionBoard);

router.get("/subject/:subject", checkSubject, questionBoardController.selectSubjectSearchQuestionBoard);

router.get("/:postId", questionBoardController.selectQuestionBoard);

router.put("/:postId", authorization.reIssueToken, boardParser.boardContentParser, questionBoardController.putQuestionBoard);

router.delete("/:postId", authorization.reIssueToken, questionBoardController.deleteQuestionBoard);

module.exports = router;
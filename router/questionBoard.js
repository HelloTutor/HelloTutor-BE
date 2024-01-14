const router  = require("express").Router({mergeParams: true});
const authorization = require("../middleware/authorization");
const { checkSubject } = require("../middleware/checkSubject");
const questionBoardController = require("../controller/questionBoard.controller");

router.post("/:subject", authorization.reIssueToken, checkSubject, questionBoardController.insertQuestionBoard);

router.get("/:subject", checkSubject, questionBoardController.selectAllQuestionBoard);

router.get("/:subject/:postId", checkSubject, questionBoardController.selectQuestionBoard);

router.put("/:subject/:postId", authorization.reIssueToken, checkSubject, questionBoardController.putQuestionBoard);

router.delete("/:subject/:postId", authorization.reIssueToken, checkSubject, questionBoardController.deleteQuestionBoard);

module.exports = router;
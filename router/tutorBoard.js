const router = require("express").Router();
const { checkSubject } = require("../middleware/checkSubject");
const { checkFilter } = require("../middleware/checkFilter");
const tutorBoardController = require("../controller/tutorBoard.controller");

router.get("/all", tutorBoardController.selectAllSearch);

router.get("/all/:filter", checkFilter, tutorBoardController.selectAllFilterSearch);

router.get("/:subject", checkSubject, tutorBoardController.subjectSearch);

router.get("/:subject/:filter", checkSubject, checkFilter);








module.exports = router;
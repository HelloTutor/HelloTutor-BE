const router = require("express").Router();
const authorization = require("../middleware/authorization");
const myPageController = require("../controller/myPage.controller");

router.get("/setting", authorization.reIssueToken, myPageController.selectMyPageSetting);

router.put("/setting", authorization.reIssueToken, myPageController.updateMyPageSetting);

router.delete("/setting", authorization.reIssueToken, myPageController.deleteMyPageSetting);

router.get("/question", authorization.reIssueToken, myPageController.selectMyPageAllQuestion);

router.get("/favorite", authorization.reIssueToken, myPageController.selectMyPageAllFavorite);

router.get("/free", authorization.reIssueToken, myPageController.selectMyPageAllFree);

router.get("/freeComment", authorization.reIssueToken, myPageController.selectMyPageAllFreeComment);

router.get("/tutor/info", authorization.reIssueToken, myPageController.selectMyPageTutorInfo);

router.put("/tutor/info/update", authorization.reIssueToken, myPageController.updateMyPageTutorInfo);

module.exports = router;
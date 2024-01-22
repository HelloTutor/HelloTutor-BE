const router = require("express").Router();
const authorization = require("../middleware/authorization");
const myPageController = require("../controller/myPage.controller");

router.use(authorization.reIssueToken);

router.get("/setting", myPageController.selectMyPageSetting);

router.put("/setting", myPageController.updateMyPageSetting);

router.delete("/setting", myPageController.deleteMyPageSetting);

router.get("/question", myPageController.selectMyPageAllQuestion);

router.get("/favorite", myPageController.selectMyPageAllFavorite);

router.get("/free", myPageController.selectMyPageAllFree);

router.get("/freeComment", myPageController.selectMyPageAllFreeComment);

router.get("/tutor/info", myPageController.selectMyPageTutorInfo);

router.put("/tutor/info/update", myPageController.updateMyPageTutorInfo);

module.exports = router;
const router = require("express").Router();
const token = require("../middleware/token");
const myPageController = require("../controller/myPage.controller");
const upload = require("../config/multer/multerConfig");

router.use(token.authorization);

router.get("/setting", myPageController.selectMyPageSetting);

router.put("/setting", myPageController.updateMyPageSetting);

router.put("/setting/profile", upload.single("profile"), myPageController.uploadProfile);

router.delete("/setting", myPageController.deleteMyPageSetting);

router.get("/question", myPageController.selectMyPageAllQuestion);

router.get("/favorite", myPageController.selectMyPageAllFavorite);

router.get("/free", myPageController.selectMyPageAllFree);

router.get("/freeComment", myPageController.selectMyPageAllFreeComment);

router.get("/tutor/info", myPageController.selectMyPageTutorInfo);

router.put("/tutor/info/update", myPageController.updateMyPageTutorInfo);

module.exports = router;
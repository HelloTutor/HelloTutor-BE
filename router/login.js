const router = require("express").Router();
const { issueToken } = require("../middleware/authorization");

router.post("/auth/login", issueToken);

module.exports = router;
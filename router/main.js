const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/failed", (req, res) => {
    res.render("failed");
});

module.exports = router;

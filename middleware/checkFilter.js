async function checkFilter(req, res, next) {
    const filter = ["review", "avgScore", "answer"];
    let validFilter = false;

    filter.forEach((element) => {
        if (element === req.params.filter) {
            req.params.checkFilter === element;
            validFilter = true;
        }
    });

    if (!validFilter) {
        return res.status(400).json({ message: "잘못된 필터 입니다." });
    }
    next();
}

module.exports = {
    checkFilter
}
async function checkFilter(req, res, next) {
    const filter = ["reviewCount", "reviewAvg", "answerCount"];
    let validFilter = false;
    console.log("req.params.filter", req.params.filter);
    filter.forEach((element) => {
        if (element === req.params.filter) {
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
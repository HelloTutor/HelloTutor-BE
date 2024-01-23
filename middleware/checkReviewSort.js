async function checkReviewSort(req, res, next) {
    const reviewSort = ["lowScore", "highScore"];

    if(!reviewSort.includes(req.query.sort)){
        return res.status(400).json({ message: "잘못된 subject입니다." });
    }

    next();
}

module.exports = {
    checkReviewSort
}
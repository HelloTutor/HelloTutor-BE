async function checkSort(req, res, next) {
    const filter = ["reviewCount", "reviewAvg", "answerCount", "lowScore", "highScore"];

    if(!subject.includes(req.params.subject)){
        return res.status(400).json({ message: "잘못된 과목입니다." });
    }

    next();
}

module.exports = {
    checkSort
}
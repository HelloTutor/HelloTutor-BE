async function checkTutorSort(req, res, next) {
    const sort = ["reviewCount", "reviewAvg", "answerCount"];

    if(!sort.includes(req.params.sort)){
        return res.status(400).json({ message: "잘못된 sort입니다." });
    }

    next();
}

module.exports = {
    checkTutorSort
}
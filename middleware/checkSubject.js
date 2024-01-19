async function checkSubject(req, res, next) {
    const subject = ["korean", "english", "mathematics", "social", "science"];

    if(!subject.includes(req.params.subject)){
        return res.status(400).json({ message: "잘못된 subject입니다." });
    }

    next();
}

module.exports = {
    checkSubject
}
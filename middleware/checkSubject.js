async function checkSubject(req, res, next) {
    const subject = ["korean","english","mathematics","social","science"];
    let validSubject = false;

    subject.forEach((element)=> {
        if (element === req.params.subject) {
            req.params.checkSubject = element;
            validSubject = true;
        }
    });

    if (!validSubject) {
        return res.status(400).json({ message: "잘못된 과목입니다." });
    }

    next();
}

module.exports = {
    checkSubject
}
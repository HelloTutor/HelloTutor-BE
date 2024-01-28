const multer = require("multer");
const path = require("path");
const uuid = require("uuid4");

const storage = multer.diskStorage({
    destination(req, file, done) {
        if(file.fieldname === "profile") {
            done(null, "./fileUpload/profile");
        } else if(file.fieldname === "freeBoardImage") {
            done(null, "./fileUpload/board/freeBoard");
        } else if(file.fieldname === "questionBoardImage") {
            done(null, "./fileUpload/board/questionBoard");
        } else {
            done(null, "./fileUpload/default");
        }
    },
    filename(req, file, done) {
        if(file.fieldname === "profile") {
            const ext = path.extname(file.originalname);
            const userId = req.user.id;
            const fileName = `${userId}${ext}`;
            done(null, fileName);
        } else if(file.fieldname === "freeBoardImage" || file.fieldname === "questionBoardImage") {
            const ext = path.extname(file.originalname);
            const fileName = `${uuid()}${ext}`;
            done(null, fileName);
        } else {
            done(new Error("Invalid fieldname"), null);
        }
    },
});

const fileFilter = (req, file, done) => {
    const allowedTypes = ["image/png"];

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("허용되지 않는 파일 형식입니다.");

        return done(error, false);
    }

    done(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
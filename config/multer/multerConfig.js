const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination(req, file, done) {
        if(file.fieldname === "profile") {
            done(null, "./fileUpload/profile");
        } else {
            done(null, "./fileUpload/default");
        }
    },
    filename(req, file, done) {
        const ext = path.extname(file.originalname);
        const userId = req.user.id;
        const fileName = `${userId}${ext}`;
        done(null, fileName);
    },
});

const fileFilter = (req, file, done) => {
    const allowedTypes = ["image/png"];

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("허용되지 않는 파일 형식입니다.");

        return done(error, false);
    }

    done(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
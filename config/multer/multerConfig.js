const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            if(file.fieldname === "profileImage") {
                done(null, "../fileUpload/profile");
            }
            done(null, "../fileUpload/default");
        },
        filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});

const fileFilter = (req, file, done) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("허용되지 않는 파일 형식입니다.");

        return done(error, false);
    }

    done(null, true)
}

module.exports = upload;
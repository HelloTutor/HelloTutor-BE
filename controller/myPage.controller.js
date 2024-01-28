const myPageRepository = require("../repository/myPageRepository");
const userRepository = require("../repository/userRepository");

async function selectMyPageSetting(req, res) {
    try {
        const { user } = req;
        if (user) {
            const row = await myPageRepository.selectMyPageSetting(user);

            return res.status(200).json(row);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function updateMyPageSetting(req, res) {
    try{
        const { body, user } = req;
        if (user) {
            const row = await myPageRepository.updateMyPageSetting(body, user);

            if(row.affectedRows === 1) {
                return res.status(200).json({ message: "수정완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function deleteMyPageSetting(req, res) {
    try {
        const { user } = req;
        if (user) {
            const row = await myPageRepository.deleteMyPageSetting(user);

            if(row) {
                return res.status(200).json({ message: "회원탈퇴완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectMyPageAllQuestion(req, res) {
    try {
        const { user } = req;
        if (user) {
            let { page, pageSize } = req.query;

            if (!page || (page <= 0)) {
                page = 1;
            }

            if(!pageSize || (pageSize <= 0)) {
                pageSize = "10";
            }

            const offset = String((page - 1) * pageSize);
            const row = await myPageRepository.selectMyPageAllQuestion(user, offset, pageSize);

            return res.status(200).json(row);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectMyPageAllFavorite(req, res) {
    try {
        const { user } = req;

        if (user) {
            let { page, pageSize } = req.query;

            if (!page || (page <= 0)) {
                page = 1;
            }

            if(!pageSize || (pageSize <= 0)) {
                pageSize = "10";
            }

            const offset = String((page - 1) * pageSize);
            const row = await myPageRepository.selectMyPageAllFavorite(user, offset, pageSize);

            return res.status(200).json(row);
        }
    } catch(error) {
            console.log(error);
            return res.status(500).json({ message: "에러발생" });
        }
    }

async function selectMyPageAllFree(req, res) {
    try {
        const { user } = req;
        if (user) {
            let { page, pageSize } = req.query;

            if (!page || (page <= 0)) {
                page = 1;
            }

            if(!pageSize || (pageSize <= 0)) {
                pageSize = "10";
            }

            const offset = String((page - 1) * pageSize);
            const row = await myPageRepository.selectMyPageAllFree(user, offset, pageSize);

            return res.status(200).json(row);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectMyPageAllFreeComment(req, res) {
    try {
        const { user } = req;
        if (user) {
            let { page, pageSize } = req.query;

            if (!page || (page <= 0)) {
                page = 1;
            }

            if(!pageSize || (pageSize <= 0)) {
                pageSize = "10";
            }

            const offset = String((page - 1) * pageSize);
            const row = await myPageRepository.selectMyPageAllFreeComment(user, offset, pageSize);

            return res.status(200).json(row);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function selectMyPageTutorInfo(req, res) {
    try {
        const { user } = req;
        if (user) {
            if(user.role === 1) {
                const row = await myPageRepository.selectMyPageTutorInfo(user);

                if(row) {
                    return res.status(200).json(row);
                }
            } else {
                return res.status(403).json({ message: "튜터가 아닙니다." });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function updateMyPageTutorInfo(req, res) {
    try {
        const { user, body } = req;

        if (user) {
            if(user.role === 1) {
                const row = await myPageRepository.updateMyPageTutorInfo(user, body);

                if(row) {
                    return res.status(200).json({ message: "수정완료" });
                }
            } else {
                return res.status(401).json({ message: "권한이 없습니다."});
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

async function uploadProfile(req, res) {
    try {
        const { user, body, file } = req;
        if(file) {
            const filePath = (NODE_ENV==="prd"?"https://tutor-api.devple.net/profile/":"http://localhost:3000/profile")+file.filename;
            body.profile = filePath;
            const row = await userRepository.updateProfile(body, user);

            if(row) {
                return res.status(200).json({ link: filePath });
            }
        }
    } catch(error) {
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    selectMyPageSetting,
    updateMyPageSetting,
    deleteMyPageSetting,
    selectMyPageAllQuestion,
    selectMyPageAllFavorite,
    selectMyPageAllFree,
    selectMyPageAllFreeComment,
    selectMyPageTutorInfo,
    updateMyPageTutorInfo,
    uploadProfile
}
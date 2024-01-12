const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const port = 3000;

const signup = require("./router/signup");
const login = require("./router/login");
const freeBoard = require("./router/freeBoard");
const questionBoard = require("./router/questionBoard");

const passport = require("passport");

app.use(cookieParser());
app.use(express.json());
app.use(cookieSession({
    name: "oAuthLogin",
    keys: [process.env.COOKIE_SECRET_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/googleStrategy");

app.use(function (req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (callback) => {
            callback();
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (callback) => {
            callback();
        }
    }
    next();
});

app.use("/auth/user", signup);
app.use("/auth/login", login);
app.use("/free", freeBoard);
app.use("/question", questionBoard);

app.listen(port, () => {
    console.log(port, "번호로 서버를 시작");
});

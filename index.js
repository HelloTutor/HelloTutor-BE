const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = 3000;
const path = require("path")


const main = require("./router/main");
const signup = require("./router/signup");
const login = require("./router/login");
const { reIssueToken } = require("./middleware/authorization");
const passport = require("passport");
const cookieSession = require("cookie-session");

app.use(cookieParser());
app.use(express.json());
app.use(cookieSession({
    name: "oAuthLogin",
    keys: [process.env.COOKIE_ENCRYPTION_KEY]
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/googleStrategy");

app.use("/", main);
app.use("/auth/user", signup);
app.use("/auth/login", login);

app.listen(port, () => {
    console.log(port, "번호로 서버를 시작");
});

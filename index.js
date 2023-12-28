const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = 3000;

const signup = require("./router/signup");
const login = require("./router/login");
const { reIssueToken } = require("./middleware/authorization");

app.use(cookieParser());
app.use(express.json());

app.use("/", signup);
app.use("/", login);

app.listen(port, () => {
    console.log(port, "번호로 서버를 시작");
});

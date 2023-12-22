const express = require('express');
const app = express();
const port = 3000;

const signup = require('./router/signup');
app.use(express.json());

app.use('/signup', signup);

app.listen(port, () => {
    console.log(port, '번호로 서버를 시작');
});

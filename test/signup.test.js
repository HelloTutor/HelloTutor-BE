const { validatedEmail } = require("../middleware/checkSignup");
const userRepository = require("../repository/userRepository");
const validatedPassword = require("../middleware/checkSignup");

describe("validatedEmail", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
    req = { body: {} };
    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    next = jest.fn();
    });

    it("유효한 이메일의 경우: ", async () => {
    // userRepository.findUserEmail 함수를 모의(Mock)하여 null을 반환하도록 설정
    userRepository.findUserEmail = jest.fn().mockResolvedValue(null);

    // 유효한 이메일을 req.body.email에 설정하고 validatedEmail 함수를 호출
    req.body.email = "new@example.com";
    await validatedEmail(req, res, next);

    // next()가 호출되는지 확인
    expect(next).toHaveBeenCalled();
    });

    it("중복된 이메일의 경우: ", async () => {
    // userRepository.findUserEmail 함수를 모의(Mock)하여 중복된 이메일을 반환하도록 설정
    userRepository.findUserEmail = jest.fn().mockResolvedValue("test@example.com");

    // 중복된 이메일을 req.body.email에 설정하고 validatedEmail 함수를 호출
    req.body.email = "test@example.com";
    await validatedEmail(req, res, next);

    // res.status(400)과 res.json이 호출되며, next()가 호출되지 않는지 확인
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ result: false, message: "중복된 이메일 입니다." });
    expect(next).not.toHaveBeenCalled();
    });

    it("유효하지 않은 이메일 양식의 경우: ", async () => {
    // 유효하지 않은 이메일을 req.body.email에 설정하고 validatedEmail 함수를 호출
    req.body.email = "invalidEmail";
    await validatedEmail(req, res, next);

    // res.status(400)과 res.json이 호출되며, next()가 호출되지 않는지 확인
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ result: false, message: "유효하지 않은 이메일 양식입니다." });
    expect(next).not.toHaveBeenCalled();
    });
});

describe("validatedPassword function", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test("비밀번호가 유효하고 일치하는 경우 next()를 호출", () => {
        req.body.pw = "validPassword123";
        req.body.checkPw = "validPassword123";

        validatedPassword(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    test("비밀번호가 유효성 검사를 통과하지 못한 경우", () => {
        req.body.pw = "invalidPassword";
        req.body.checkPw = "invalidPassword";

        validatedPassword(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ result: false, message: "유효하지 않은 비밀번호 양식입니다." });
        expect(next).not.toHaveBeenCalled();
    });

    test("비밀번호와 확인용 비밀번호가 일치하지 않는경우", () => {
        req.body.pw = "password123";
        req.body.checkPw = "password1234";

        validatedPassword(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ result: false, message: "비밀번호가 일치하지 않습니다." });
        expect(next).not.toHaveBeenCalled();
    });
});
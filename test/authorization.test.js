// const { issueToken } = require("../middleware/authorization");

// test("issueToken test - 로그인하면 토큰이 발급되어야아한다.", async () => {
//     const res = {
//         status: jest.fn(),
//         send: jest.fn(),
//         json: jest.fn()
//     };
//     const req = {
//         body: {
//             email: "test@gmail.com",
//             pw: "gmlcjf2!@!"
//         }
//     };

//     res.json.mockReturnValue("에러")
//     await issueToken(req, res);

//     expect(res.status).toBe(200);
//     expect(res.send).toHaveBeenCalledWith({
//         accessToken: expect.any(String),
//         refreshToken: expect.any(String),
//         message: "로그인 성공"
//     });
// });

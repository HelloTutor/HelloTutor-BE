const router = require("express").Router();
const paymentRepository = require("../repository/paymentRepository");
const { PORTONE_API_SECRET } = process.env;

router.post("/", async (req, res) => {
    try {
        const { paymentId } = req.body;

        const signInResponse = await axios({
            url: "https://api.portone.io/login/api-secret",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
                apiSecret: PORTONE_API_SECRET,
            },
        });

        const { accessToken } = signInResponse.data;

        const paymentResponse = await axios({
        url: `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
        method: "get",
        // 1번에서 발급받은 액세스 토큰을 Bearer 형식에 맞게 넣어주세요.
        headers: { "Authorization": "Bearer " + accessToken },
        });
        const { id, status, amount, method } = paymentResponse.data;

        const order = await paymentRepository.selectPayment(id);

        if (order.amount === amount.total) {
            switch (status) {
                case "VIRTUAL_ACCOUNT_ISSUED": {
                // 가상 계좌가 발급된 상태입니다.
                // method에 들어 있는 계좌 정보를 이용해 원하는 로직을 구성하세요.
                break;
                }
                case "PAID": {
                    const row = await paymentRepository.updatePayment();
                break;
                }
            }
        } else {
            res.status(500).json({ message: "금액이 일치 하지 않습니다." });
        }
    } catch(error) {
        res.status(400).json({ message: "에러발생" });
    }
});

module.exports = router;
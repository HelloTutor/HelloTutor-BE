const paymentRepository = require("../repository/paymentRepository");

async function insertPayment(req, res) {
    try {
        const { user, body, params: { tutorId } } = req;

        if(user) {
            const row = await paymentRepository.insertPayment(tutorId, user, body);

            if(row) {
                return res.status(200).json({ message: "결제시도 완료" });
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "에러발생" });
    }
}

module.exports = {
    insertPayment
}
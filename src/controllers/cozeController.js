const apiProxy = require('../utils/apiProxy');

exports.askCoze = async (req, res) => {
    const userQuery = req.body.query;

    if (!userQuery) {
        return res.status(400).json({ error: 'Missing query parameter.' });
    }

    try {
        // Gọi hàm trong apiProxy để gửi yêu cầu đến Coze AI
        const cozeResponseData = await apiProxy.callCozeApi(userQuery);

        // Chuyển tiếp phản hồi của Coze về frontend
        // Giả định cozeResponseData có cấu trúc { message: { content: "..." } }
        if (cozeResponseData && cozeResponseData.messages && cozeResponseData.messages[0] && cozeResponseData.messages[0].content) {
            res.json({ message: { content: cozeResponseData.messages[0].content } });
        } else {
            // Xử lý trường hợp Coze trả về cấu trúc không mong muốn
            console.warn("Coze API returned unexpected data structure:", cozeResponseData);
            res.status(500).json({ error: "Invalid response from Coze AI." });
        }

    } catch (error) {
        console.error("Error in cozeController.askCoze:", error);
        // Kiểm tra xem lỗi có phải là lỗi HTTP từ Coze không
        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to process your request.' });
    }
};
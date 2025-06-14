const fetch = require('node-fetch');

// Lấy biến môi trường an toàn
const COZE_API_KEY = process.env.COZE_API_KEY;
const COZE_BOT_ENDPOINT = process.env.COZE_BOT_ENDPOINT;
const COZE_BOT_ID = process.env.COZE_BOT_ID;

if (!COZE_API_KEY || !COZE_BOT_ENDPOINT || !COZE_BOT_ID) {
    console.error("Coze API credentials are not fully configured in environment variables.");
    // Ném lỗi hoặc xử lý khác khi thiếu cấu hình quan trọng
    process.exit(1); // Thoát ứng dụng nếu thiếu cấu hình quan trọng khi khởi động
}

exports.callCozeApi = async (userQuery) => {
    try {
        const cozeResponse = await fetch(COZE_BOT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COZE_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                conversation_id: "a-unique-session-id", // Có thể tạo ID duy nhất cho mỗi phiên
                bot_id: COZE_BOT_ID,
                user: "website-user-coze-proxy", // ID người dùng giả định
                query: userQuery,
                stream: false,
            })
        });

        if (!cozeResponse.ok) {
            const errorText = await cozeResponse.text();
            const error = new Error(`Coze API error: ${cozeResponse.status} - ${errorText}`);
            error.status = cozeResponse.status;
            throw error;
        }

        return await cozeResponse.json();

    } catch (error) {
        console.error("Error calling Coze API:", error);
        throw error; // Ném lỗi để controller xử lý
    }
};
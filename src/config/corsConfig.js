const cors = require('cors');

// Lấy URL WordPress từ biến môi trường
const WORDPRESS_FRONTEND_URL = process.env.WORDPRESS_FRONTEND_URL;

const corsOptions = {
    origin: WORDPRESS_FRONTEND_URL, // Chỉ cho phép tên miền WordPress của bạn
    methods: ['POST'],             // Chỉ cho phép phương thức POST
    allowedHeaders: ['Content-Type'] // Chỉ cho phép Content-Type header
};

// Xuất middleware CORS đã cấu hình
module.exports = cors(corsOptions);
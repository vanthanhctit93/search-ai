require('dotenv').config(); // Tải biến môi trường

const express = require('express');
const cozeRoutes = require('./src/routes/cozeRoutes'); // Import routes
const corsConfig = require('./src/config/corsConfig'); // Import cấu hình CORS
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình Middleware
app.use(express.json()); // Phân tích JSON body
app.use(corsConfig);     // Áp dụng CORS middleware đã cấu hình

// Phục vụ các file tĩnh (nếu bạn có giao diện UI cho proxy, không bắt buộc)
// app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa các Route API
app.use('/api', cozeRoutes); // Tất cả các route trong cozeRoutes sẽ bắt đầu bằng /api

// Xử lý các route không tồn tại
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

// Xử lý lỗi tập trung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access API at: http://localhost:${PORT}/api/ask-coze`);
});
const express = require('express');
const router = express.Router();
const cozeController = require('../controllers/cozeController');

// Định nghĩa route POST cho yêu cầu từ frontend WordPress
router.post('/ask-coze', cozeController.askCoze);

module.exports = router;
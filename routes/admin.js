const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin');



router.get('/', controller.isAdmin)

module.exports = router;
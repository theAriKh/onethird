const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin');



router.get('/index', controller.isAdmin)
router.get('/add', controller.addItem)
router.post('/add', controller.processItem)

module.exports = router;
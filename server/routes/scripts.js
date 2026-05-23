const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/scriptController');

router.post('/generate', ctrl.generateScript);

module.exports = router;

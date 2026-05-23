const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/hashtagController');

router.get('/', ctrl.getHashtags);
router.post('/seo', ctrl.generateSEO);

module.exports = router;

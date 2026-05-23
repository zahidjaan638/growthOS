const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/trendingController');

router.get('/', ctrl.getTrending);
router.get('/categories', ctrl.getCategories);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/growthController');

router.get('/metrics', ctrl.getMetrics);
router.get('/top-content', ctrl.getTopContent);
router.get('/traffic-sources', ctrl.getTrafficSources);
router.get('/summary', ctrl.getSummary);

module.exports = router;

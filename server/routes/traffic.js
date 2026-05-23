const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/trafficController');

router.get('/cta', ctrl.getCTASuggestions);
router.get('/bio-link', ctrl.getBioLinkStrategy);
router.get('/lead-capture', ctrl.getLeadCaptureStrategy);

module.exports = router;

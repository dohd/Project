const express = require('express');
const router = express.Router();
const ProgrammeGraph = require('../controllers/ProgrammeGraph');

router.get('/participants-per-programme', ProgrammeGraph.findAll);

module.exports = router;
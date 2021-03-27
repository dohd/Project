const express = require('express');
const router = express.Router();
const ProgrammeGraph = require('../controllers/ProgrammeGraph');

router.get('/', ProgrammeGraph.findAll);

module.exports = router;
const express = require('express');
const router = express.Router();
const Gender = require('../controllers/Gender');

router.get('/', Gender.findAll);

module.exports = router;

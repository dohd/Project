const express = require('express');
const router = express.Router();
const OrgProfile = require('../controllers/OrgProfile');
const checkRole = require('../utils/checkRole');

router.get('/', OrgProfile.findOne);

router.post('/', checkRole.isAdmin, OrgProfile.update);

module.exports = router;
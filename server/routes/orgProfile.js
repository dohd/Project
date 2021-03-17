const express = require('express');
const router = express.Router();
const OrgProfile = require('../controllers/OrgProfile');
const authRole = require('../utils/authRole');

router.get('/', OrgProfile.findOne);

router.post('/', authRole.isAdmin, OrgProfile.update);

module.exports = router;
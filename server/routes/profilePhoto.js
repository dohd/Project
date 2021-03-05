const express = require('express');
const router = express.Router();
const ProfilePhoto = require('../controllers/ProfilePhoto');
const checkRole = require('../utils/checkRole')

router.get('/', ProfilePhoto.findAll);

router.post('/', checkRole.isAdmin, ProfilePhoto.create);

module.exports = router;
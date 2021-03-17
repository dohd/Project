const express = require('express');
const router = express.Router();
const ProfilePhoto = require('../controllers/ProfilePhoto');
const authRole = require('../utils/authRole')

router.get('/', ProfilePhoto.findAll);

router.post('/', authRole.isAdmin, ProfilePhoto.create);

module.exports = router;
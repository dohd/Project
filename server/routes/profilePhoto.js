const express = require('express');
const router = express.Router();
const ProfilePhoto = require('../controllers/ProfilePhoto');
const authRole = require('../middlewares/authRole');

router.get('/', ProfilePhoto.findAll);

router.post('/', authRole.isAdmin, ProfilePhoto.create);

module.exports = router;
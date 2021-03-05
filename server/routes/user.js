const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const checkRole = require('../utils/checkRole');

router.post('/', checkRole.isAdmin, User.create);

router.get('/', checkRole.isAdmin, User.findAll);

router.patch('/:id', checkRole.isAdmin, User.update);

router.delete('/:id', checkRole.isAdmin, User.delete);

module.exports = router;
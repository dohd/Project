const express = require('express');
const router = express.Router();
const Region = require('../controllers/Region');
const checkRole = require('../utils/checkRole');

router.get('/', Region.findAll);

router.post('/', checkRole.isAdmin, Region.create);

router.patch('/:id', checkRole.isAdmin, Region.update);

router.delete('/:id', checkRole.isAdmin, Region.delete);

module.exports = router;
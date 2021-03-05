const express = require('express');
const router = express.Router();
const EventPhoto = require('../controllers/EventPhoto');

router.get('/', EventPhoto.findAll);

router.patch('/:id', EventPhoto.update);

router.delete('/:id', EventPhoto.delete);

module.exports = router;
const express = require('express');
const controller = require('../controllers/index');

const router = express.Router();

router.get('/', controller.index);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', controller.logout);

module.exports = router;

// @ts-check

const express = require('express');
const controller = require('../controllers/index');

const router = express.Router();

router.get('/', controller.index);
router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost);
router.get('/register', controller.registerGet);
router.post('/register', controller.registerPost);
router.get('logout', controller.logout);

module.exports = router;

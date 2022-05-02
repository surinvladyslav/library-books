const Router = require('express');
const router = new Router();

const AuthController = require('../controller/auth.controller');

router.post('/login', AuthController.loginUser);
router.post('/registration', AuthController.registrationUser);
router.get('/refresh', AuthController.refreshUser);

module.exports = router;
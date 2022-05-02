const Router = require('express');
const router = new Router();

const isAuth = require('../middleware/auth.middleware');
const UserController = require('../controller/user.controller');

router.put('/username/:id', isAuth, UserController.updateUsername);
router.put('/password/:id', isAuth, UserController.updatePassword);
router.get('/logout/:id', isAuth, UserController.logoutUser);
router.delete('/delete/:id', isAuth, UserController.deleteUser);

module.exports = router;
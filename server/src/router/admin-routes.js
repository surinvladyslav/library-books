const Router = require('express');
const router = new Router();

const Authorization = require('../middleware/admin-middleware')
const AdminController = require('../controller/admin-controller')

router.post('/admin/login', AdminController.login);
router.post('/admin/registration', AdminController.registration);
router.get('/admin/refresh', AdminController.refresh);
router.get('/admins', Authorization, AdminController.admins);
router.get('/admin/logout/:id', Authorization, AdminController.logout);
router.delete('/admin/delete/:id', Authorization, AdminController.delete);
router.put('/admin/name/:id', Authorization, AdminController.name);
router.put('/admin/password/:id', Authorization, AdminController.password);
// router.put('/book/image/:id', AdminController.image);

module.exports = router;
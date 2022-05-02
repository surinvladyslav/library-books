const Router = require('express');
const router = new Router();

const { upload } = require('../middleware/file.middleware');
const isAuth = require('../middleware/auth.middleware');
const BookController = require('../controller/book.controller');

router.post('/book', isAuth,  upload.single('file'), BookController.createBook);
router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getBook);
router.delete('/books/:id', isAuth, BookController.deleteBook);
router.put('/books/:id', isAuth, BookController.changeBook);

module.exports = router;
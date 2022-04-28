const Router = require('express');
const router = new Router();

const { upload } = require('../middleware/file-middleware');
const BookController = require('../controller/book-controller');
const Authorization = require("../middleware/admin-middleware");

// Authorization,
router.post('/book', upload.single('file'), BookController.createBook);
router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getBook);
router.delete('/books/:id', Authorization, BookController.deleteBook);
router.put('/books/:id', Authorization, BookController.changeBook);
module.exports = router;
const BookService = require('../service/book-service')

class BookController {
    async createBook(req, res, next) {
        try {
            const file = req.file;
            const data = req.body;
            const book = await BookService.createBook(data, file)
            return res.json(book)
        } catch(e) {
            next(e)
        }
    }

    async getBooks(req, res, next) {
        try {
            const books = await BookService.getBooks()
            res.json(books)
        } catch(e) {
            next(e)
        }
    }

    async getBook(req, res, next) {
        try {
            const id = req.params.id;
            const book = await BookService.getBook(id)
            res.json(book)
        } catch(e) {
            next(e)
        }
    }

    async deleteBook(req, res, next) {
        try {
            const id = req.params.id;
            await BookService.deleteBook(id)
            return res.json({
                result: 'Deleted book',
            })
        } catch(e) {
            next(e)
        }
    }

    async changeBook(req, res, next) {
        try {
            const data = req.body;
            const id = req.params.id;
            await BookService.changeBook(data, id)
            return res.json({
                result: 'Changed book',
            })
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new BookController()
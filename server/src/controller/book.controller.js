const BookService = require('../service/book.service');
const BooksModel = require("../models/book.model");
const BaseErrors = require("../error");

class BookController {
    async createBook(req, res, next) {
        try {
            const file = req.file;
            const data = req.body;

            if (!file) {
                throw BaseErrors.BadRequest('please upload a file');
            }

            const checkBook = await BooksModel.findOne({title: data.title});
            if(checkBook) {
                throw BaseErrors.BadRequest('already have this book');
            }

            const book = await BookService.createBook(data, file);

            return res.json(book);
        } catch(e) {
            next(e);
        }
    }

    async getBooks(req, res, next) {
        try {
            const books = await BookService.getBooks();

            return res.json(books);
        } catch(e) {
            next(e);
        }
    }

    async getBook(req, res, next) {
        try {
            const id = req.params.id;

            const book = await BookService.getBook(id);

            return res.json(book);
        } catch(e) {
            next(e);
        }
    }

    async deleteBook(req, res, next) {
        try {
            const id = req.params.id;

            await BookService.deleteBook(id);

            return res.json({
                result: 'deleted book',
            })
        } catch(e) {
            next(e);
        }
    }

    async changeBook(req, res, next) {
        try {
            const data = req.body;
            const id = req.params.id;

            await BookService.changeBook(data, id);

            return res.json({
                result: 'changed book',
            })
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new BookController();
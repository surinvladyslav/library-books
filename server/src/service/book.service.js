const BookModel = require('../models/book.model');
const BaseErrors = require('../error');

class BookService {
    createBook (data, file) {
        console.log(data, file);

        return BookModel.create({...data, image: file.path});
    }

    getBooks() {
        return BookModel.find();
    }

    async getBook(id) {
        const book = await BookModel.findOne({_id: id});
        if(!book) {
            throw BaseErrors.NotFound('such book no found');
        }

        return book
    }

    async changeBook(data, id) {
        const book = await BookModel.findByIdAndUpdate(id, data);
        if(!book) {
            throw BaseErrors.NotFound('such book no found');
        }

        return book;
    }

    async deleteBook(id) {
        const book = await BookModel.deleteOne({_id: id});
        if(!book) {
            throw BaseErrors.NotFound('such book no found');
        }

        return book;
    }
}

module.exports = new BookService();
const BooksModel = require('../models/books-model');
const CustomError = require('../error');
const ImageModel = require("../models/image-model");

class BookService {
    async createBook (data, file) {
        console.log(data, file);
        if (!file) {
            throw CustomError.BadRequest('please upload a file')
        }

        const checkBook = await BooksModel.findOne({title: data.title})
        if(checkBook) {
            throw CustomError.BadRequest('already have this book')
        }

        const book = await BooksModel.create({...data, image: file.path})
        return {
            book,
        }
    }

    async getBooks() {
        return await BooksModel.find()
    }

    async getBook(id) {
        const book = await BooksModel.findOne({_id: id})
        if(!book) {
            throw CustomError.NotFound('such book no found')
        }
        return book
    }

    async changeBook(data, id) {
        const book = await BooksModel.findByIdAndUpdate(id, data)
        if(!book) {
            throw CustomError.NotFound('such book no found')
        }
        return book;
    }

    async deleteBook(id) {
        const book = await BooksModel.deleteOne({_id: id})
        if(!book) {
            throw CustomError.NotFound('such book no found')
        }
        return book
    }

    // async image(req, res, next) {
    //     try {
    //         const id = req.params.id;
    //         const {oldPassword, newPassword, confirmPassword} = req.body
    //         const user = await UserService.password(id, oldPassword, newPassword, confirmPassword)
    //         res.send({
    //             user,
    //             relust: 'Changed password'
    //         })
    //     } catch(e) {
    //         next(e)
    //     }
    // }
}

module.exports = new BookService();
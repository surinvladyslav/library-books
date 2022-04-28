const { Schema, model } = require('mongoose')

const Book = new Schema({
    title: {type: String},
    year: {type: Number},
    author: {type: String},
    image:  {type: String},
    pages: {type: Number},
    have: {type: Boolean},
})

module.exports = model('Book', Book)
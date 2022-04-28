const { Schema, model } = require('mongoose')

const Image = new Schema({
    image: {type: String, required: true},
})

module.exports = model('Image', Image)

const { Schema, model } = require('mongoose')

const Admin = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
})

module.exports = model('Admin', Admin)
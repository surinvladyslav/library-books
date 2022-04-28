const { Schema, model } = require('mongoose')

const Token = new Schema({
    admin: {type: Schema.Types.ObjectId, ref: 'Admin'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', Token)
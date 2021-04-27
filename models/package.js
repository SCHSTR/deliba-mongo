const mongoose = require('mongoose')

const Schema = mongoose.Schema

const packageSchema = new Schema({
    userId: String,
    telegramId: String,
    trackCode: {type: String, unique: true},
    status: String,
    local: String,
    origem: String,
    destino: String
})

module.exports = mongoose.model('packages', packageSchema)
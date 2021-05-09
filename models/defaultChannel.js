const mongoose = require('mongoose')

const Schema = mongoose.Schema

const channelSchema = new Schema({
    guildId: {type: String, unique: true},
    channelId: String,
    discordOwner: String
})

module.exports = mongoose.model('defaultChannel', channelSchema, 'defaultChannel')
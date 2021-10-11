const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        nickname: {type: String},
        email: {type: String},
        id_number: {type: String, required: true}
    }
)

module.exports = mongoose.model('User',  UserSchema)
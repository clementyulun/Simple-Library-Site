const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserAuthSchema = new Schema(
    {
        auth_type: {type: String, required: true},
        user_id : {type: Schema.Types.ObjectId, ref: 'User', required: true},
        identifier: {type: String},
        credential: {type: String}
    }
)

module.exports = mongoose.model('User_AUTH', UserAuthSchema)
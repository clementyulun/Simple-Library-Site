const mongooes = require('mongoose')

const Schema = mongooes.Schema

const GenreSchema = new Schema(
    {
        name: {type: String, required: true, min:3, max: 100}
    }
)

GenreSchema.virtual('url').get(function () {
    return `/catalog/genre/${this._id}`
})

module.exports = mongooes.model('Genre', GenreSchema)
const mongoose = require('mongoose')
const schema = mongoose.Schema

const PraticeModelSchema = new schema({
    a_string: String,
    a_date: Date
})

let PraticeModel = mongoose.model('PraticeModel', PraticeModelSchema)

module.exports = PraticeModel
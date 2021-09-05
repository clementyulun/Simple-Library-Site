const mongoose = require('mongoose')
const connectionString = 'mongodb://127.0.0.1/pratice'

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.log.bind(console, 'MongoDB connection failed: '))
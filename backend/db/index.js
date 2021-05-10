const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://earthsurapha:earth0625@cluster0-fics4.azure.mongodb.net/Bisectionfx', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

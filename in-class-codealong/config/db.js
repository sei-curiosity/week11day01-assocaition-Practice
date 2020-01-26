const mongoose = require ('mongoose') //required to interface with mongoDB

//* Connection String
mongoose.connect(`mongodb://localhost/users`,
{ useNewUrlParser: true, useUnifiedTopology: true,
useFindAndModify: false, useCreateIndex: true})

//* initiate a connection
const db = mongoose.connection

//* error handling and after connection
db.on('error', (err => console.log(err))) //handling error
db.once('open', (() => console.info('Mongoose connected', "//", new Date())))

//* exporting our connection to mongoDB to be used by models/controller/whatever
module.exports = db 
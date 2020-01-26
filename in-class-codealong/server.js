const express = require('express') // getting framework express
const app = express() //loading the framework express
const db = require('./config/db') //initiating db connection
const logger = require('morgan') //logger for debugging 
const bodyParser = require('body-parser') // JSON <-> JS Objects
const UserController = require('./controllers/users_controller') //controllers

//* loading our middlewares
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(logger('dev'))

app.use('/', UserController)

app.listen(3000)
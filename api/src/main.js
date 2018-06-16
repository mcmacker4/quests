const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./store')

const app = express()

//Middleware
app.use('/', morgan('tiny'))
app.use('/', bodyParser.json())

//Routes
app.use('/api/quest', require('./quest'))

//Error handling
app.use('/', (err, req, res, next) => {
    console.error(err.stack)
    res.status(err.errno || 500)
    res.json({ error: err.message })
    res.end()
})

//Connect to database
db.connect(err => {
    if(err) throw new Error(`DB Error (${err.errno}): ${err.message}`)
    console.log("DB Connected.")
    //Start http server
    app.listen(8080, () => console.log("HTTP Server listening."))
})
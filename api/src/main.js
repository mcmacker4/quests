const express = require('express')
const morgan = require('morgan')
const { db } = require('./store')

const app = express()

//Logging middleware
app.use('/', morgan('tiny'))

//Routes
app.use('/quest', require('./quest'))

//Error handling
app.use('/', (err, req, res, next) => {
    console.error(err)
    res.status(err.errno || 500)
    res.json({ error: err.message })
    res.end()
})

//Connect to database
db.connect(err => {
    if(err) throw new Error(`DB Error (${err.errno}): ${err.message}`)
    console.log("DB Connected.")
    //Start listening
    app.listen(8080, () => console.log("HTTP Server listening."))
})
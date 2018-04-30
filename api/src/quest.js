const express = require('express')
const quest = express.Router()

const store = require('./store')

quest.get('/:id', (req, res, next) => {
    store.getQuest(req.params['id']).then(quest => {
        res.json(quest).end()
    }).catch(err => next(err))
})

module.exports = quest
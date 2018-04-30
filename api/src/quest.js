const express = require('express')
const quest = express.Router()

const store = require('./store')

//Get quest
quest.get('/:id', (req, res, next) => {
    store.getQuest(req.params['id']).then(quest => {
        res.json(quest).end()
    }).catch(next)
})

//Post new quest
quest.post('/', (req, res, next) => {
    if(!req.body) { next(new Error('JSON body expected.')); return }
    store.createQuest(req.body['title'], req.body['description']).then(quest => {
        res.json(quest).end()
    }).catch(next)
})

//Get quest's task
quest.get('/:id/tasks', (req, res, next) => {
    store.getTasks(req.params['id']).then(tasks => {
        res.json(tasks).end()
    }).catch(next)
})

//Post new task for quest
quest.post('/:id/tasks', (req, res, next) => {
    if(!req.body) { next(new Error('JSON body expected.')); return }
    store.createTask(req.body['title'], req.body['position'], req.params['id']).then(task => {
        res.json(task).end()
    }).catch(next)
})

module.exports = quest
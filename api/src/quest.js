const express = require('express')
const quest = express.Router()

const store = require('./store')

//Get all quests
quest.get('/', (req, res, next) => {
    store.getAllQuests().then(quests => {
        res.json(quests).end()
    }).catch(next)
})

//Get single quest
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

//Delete quest
quest.delete('/:id', (req, res, next) => {
    store.deleteQuest(req.params['id']).then(() => {
        res.end()
    }).catch(next)
})

//Post new task for quest
quest.post('/:id/task', (req, res, next) => {
    if(!req.body) { next(new Error('JSON body expected.')); return }
    store.createTask(req.body['title'], req.body['position'], req.params['id']).then(task => {
        res.json(task).end()
    }).catch(next)
})

module.exports = quest
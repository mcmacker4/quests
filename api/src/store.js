const mysql = require('mysql')
const uuid = require('shortid').generate
const { normalize, schema } = require('normalizr')

const db = mysql.createConnection(require('../config.json')['db']) //Fetch db config from config file.

//Normalizr Schema
const taskEntity = new schema.Entity('task')
const questEntity = new schema.Entity('quest', {
    tasks: [taskEntity]
})

function mergeJoinResults(results, keepArray = false) {

    const quests = {}
                    
    results.forEach((result) => {
        
        const id = result['q']['id']

        //If quest is new, assign
        if(!quests[id]) {
            quests[id] = result['q']
            quests[id]['tasks'] = []
        }

        //Add task to existing quest
        const task = result['t']
        //Only if task is not null
        if(task['title'] !== null && task['position'] !== null) {
            const pos = task['position']
            quests[id]['tasks'][pos] = task
        }

    })

    const questArray = Object.keys(quests).map(id => quests[id]);
    if(questArray.length === 1 && !keepArray)
        return questArray[0]
    return questArray;

}

module.exports = {

    getAllQuests: () => {
        return new Promise((resolve, reject) => {
            db.query(
                {
                    sql: 'SELECT q.id, q.title, q.description, t.title, t.position, t.complete FROM quests q LEFT JOIN tasks t ON q.id = t.questId;',
                    nestTables: true
                },
                (error, results, fields) => {
                    if(error) { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                    resolve(mergeJoinResults(results, true))
                }
            )
        })
    },

    //Fetch a single quest from the database.
    getQuest: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                {
                    sql: 'SELECT q.id, q.title, q.description, t.title, t.position, t.complete FROM quests q LEFT JOIN tasks t ON q.id = t.questId WHERE q.id = ?;',
                    nestTables: true,
                    values: [id]
                },
                (error, results, fields) => {
                    if(error) { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                    if(results.length === 0) { reject(new Error("Quest not found.")); return }

                    resolve(mergeJoinResults(results))
                }
            )
        })
    },

    //Create a new quest on the database
    createQuest: (title, description) => {
        return new Promise((resolve, reject) => {
            const id = uuid()
            db.query("INSERT INTO quests (id, title, description) VALUES (?, ?, ?)", [id, title, description], (error, results, fields) => {
                if(error)  { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                resolve({
                    id,
                    title,
                    description,
                    tasks: []
                })
            })
        })
    },

    //Delete a quest
    deleteQuest: (id) => {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM quests WHERE id = ?", [id], (error, results, fields) => {
                if(error)  { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                resolve()
            })
        })
    },

    //Create task
    createTask: (title, position, questId) => {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO tasks (title, position, questId) VALUES (?, ?, ?)", [title, position, questId], (error, results, fields) => {
                if(error) { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                resolve({
                    title,
                    position,
                    complete: false,
                    questId
                })
            })
        })
    },

    db: db

}
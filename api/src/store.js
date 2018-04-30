const mysql = require('mysql')
const uuid = require('shortid').connect

const db = mysql.createConnection(require('../config.json')['db']) //Fetch db config from config file.

module.exports = {

    //Fetch a single quest from the database.
    getQuest: (id) => {
        return new Promise((resolve, reject) => {
            db.query("SELECT id, title, description FROM quests WHERE id = ?", [id], (error, results, fields) => {
                if(error) { reject(new Error(`DB Error ${error.errno}: ${error.message}`)); return }
                if(results.length === 0) { reject(new Error("Quest not found.")); return }
                resolve({
                    id: results[0]['id'],
                    title: results[0]['title'],
                    description: results[0]['description']
                })
            })
        })
    },

    //Create a new quest on the database
    createQuest: (title, description) => {
        return new Promise((resolve, reject) => {
            const id = uuid()
            db.query("INSERT INTO quests (id, title, description) VALUES (?, ?, ?)", [id, title, description], (error, results, fields) => {
                if(error) reject(new Error(`DB Error ${error.errno}: ${error.message}`))
                resolve({
                    id: id,
                    title: title,
                    description: description
                })
            })
        })
    },

    db: db

}
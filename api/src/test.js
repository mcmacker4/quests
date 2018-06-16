

const store = require('./store')

store.getAllQuests().then((quests) => {
    console.log('\n\n\n-------- ALL QUESTS --------')
    console.log(JSON.stringify(quests, null, 4))
}).catch(console.error)

store.getQuest('Bk2XaTVpz').then(quest => {
    console.log('\n\n\n-------- SINGLE QUEST --------')
    console.log(JSON.stringify(quest, null, 4))
}).catch(console.error)

store.db.end()
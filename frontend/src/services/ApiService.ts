import http from 'http'
import { parse } from 'url'

import { Quest, Task } from "../interfaces"

interface SingleApiTask extends Task {
    questId: string
}

export class ApiService {

    private request(uri: string, method: string = 'GET', data: string = null) : Promise<string> {

        return new Promise((resolve, reject) => {

            const req = http.request({
                method,
                path: uri,
                headers: {
                    'Content-Type': 'application/json'
                }
            }, (res) => {

                if(res.statusCode !== 200)
                    reject(new Error(`[API] ERROR: Request failed with status code ${res.statusCode}`))
                
                let data = ""
                res.on('data', chunk => data += chunk)
                res.on('end', () => {
                    resolve(data)
                })

            })

            req.on('error', reject)

            if(data)
                req.write(data)

            req.end()
        })

    }

    getAllQuests() : Promise<Quest[]> {
        console.log(`[API] Getting all quests.`)
        return new Promise((resolve, reject) => {
            this.request('/api/quest').then(data => {
                resolve(JSON.parse(data))
            }).catch(reject)
        })
    }

    createQuest(title: string, description: string) : Promise<Quest> {
        console.log(`[API] Creating new quest ("${title}", "${description}")`)
        return new Promise((resolve, reject) => {
            this.request('/api/quest', 'POST', JSON.stringify({ title, description })).then(data => {
                resolve(JSON.parse(data))
            }).catch(reject)
        })
    }

    deleteQuest(quest: Quest) {
        console.log(`[API] Deleting quest (${quest.id})`)
        return new Promise((resolve, reject) => {
            this.request(`/api/quest/${quest.id}`, 'DELETE').then(() => {
                resolve()
            }).catch(reject)
        })
    }

}
import React, { Component, SyntheticEvent, createContext } from 'react'
import {ApiService} from '../services/ApiService'

import { Quest } from '../interfaces'
import { QuestForm } from './QuestForm';
import { Sidebar } from './Sidebar';
import { Content } from './Content';

export interface AppState {
    quests: Quest[]
    createQuest: (title: string, description: string) => void,
    deleteQuest: (quest: Quest) => void
}

export const AppContext = createContext<AppState>({
    quests: [],
    createQuest: (title, description) => {},
    deleteQuest: (quest) => {}
})

export class Application extends Component<{}, AppState> {

    private api = new ApiService()

    constructor(props: {}) {
        super(props)
        this.state = {
            quests: [],
            createQuest: this.createQuest,
            deleteQuest: this.deleteQuest
        }
    }

    componentWillMount() {
        this.api.getAllQuests().then(quests => {
            this.setState({
                quests
            })
        }).catch(console.error)
    }

    createQuest = (title: string, description: string) => {
        this.api.createQuest(title, description).then(quest => {
            this.setState(state => {
                state.quests.push(quest)
                return { quests: state.quests }
            })
        }).catch(console.error)
    }

    deleteQuest = (quest: Quest) => {
        this.api.deleteQuest(quest).then(() => {
            this.setState(state => ({
                quests: state.quests.filter(q => q.id !== quest.id)
            }))
        })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <div className="app">
                    <div className="header">
                    </div>
                    <div className="wrap">
                        <Sidebar />
                        <Content />
                    </div>
                </div>
            </AppContext.Provider>
        )
    }

}

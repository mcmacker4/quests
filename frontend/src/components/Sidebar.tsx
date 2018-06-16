import React, { Component } from 'react'
import { QuestForm } from './QuestForm';
import { AppContext } from './Application'

export class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar container">
                <div className="head">
                    <h2>New Quest</h2>
                </div>
                <AppContext.Consumer>{ ({ createQuest }) =>
                    <QuestForm onSubmit={createQuest} />
                }</AppContext.Consumer>
            </div>
        )
    }

}
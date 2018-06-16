import React, { Component } from 'react'
import { AppContext } from './Application';

export class Content extends Component {

    render() {
        return (
            <div className="content container">
                <div className="head">
                    <h2>Quests</h2>
                </div>
                <div className="list-container">
                    <table>
                        <tbody>
                            <AppContext.Consumer>{ ({ quests, deleteQuest }) =>
                                quests.map(quest =>
                                    <tr key={quest.id}>
                                        <td className="title">{quest.title}</td>
                                        <td className="description">{quest.description}</td>
                                        <td className="taskcount">{quest.tasks.filter(t => t.complete).length}/{quest.tasks.length}</td>
                                        <td className="delete"><button onClick={e =>deleteQuest(quest)}>Delete</button></td>
                                    </tr>
                                )
                            }</AppContext.Consumer>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
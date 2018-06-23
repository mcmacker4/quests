import React, { Component } from 'react'
import { AppContext } from './Application';

export class Content extends Component {

    render() {
        return (
            <AppContext.Consumer>{ ({ quests, deleteQuest }) =>
                <div className="content container">
                    <div className="head">
                        <h2>Quests</h2>
                    </div>
                    <div className="list-container">
                        <table>
                            <tbody>{
                                quests.map(quest =>
                                    <tr key={quest.id}>
                                        <td className="title"><p>{quest.title}</p></td>
                                        <td className="description"><p>{quest.description}</p></td>
                                        <td className="taskcount"><p>{quest.tasks.filter(t => t.complete).length}/{quest.tasks.length}</p></td>
                                        <td className="delete"><button onClick={e =>deleteQuest(quest)}>Delete</button></td>
                                    </tr>
                                )
                            }</tbody>
                        </table>
                    </div>
                    <div className="footer">
                        <p>You have {quests.length} quests.</p>
                    </div>
                </div>
            }</AppContext.Consumer>
        )
    }

}
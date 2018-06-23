import React, { Component, SyntheticEvent } from 'react'

interface QuestFormProps {
    onSubmit: (title: string, description: string) => void
}

interface QuestFormState {
    title: string
    description: string
}

export class QuestForm extends Component<QuestFormProps, QuestFormState> {

    constructor(props: QuestFormProps) {
        super(props)
        this.state = {
            title: "",
            description: ""
        }
    }

    onTitleChange = (value: string) => {
        this.setState({
            title: value
        })
    }

    onDescriptionChange = (value: string) => {
        this.setState({
            description: value
        })
    }

    onSubmit = (event: SyntheticEvent) => {
        this.props.onSubmit(this.state.title, this.state.description)
        this.setState({
            title: "",
            description: ""
        })
        event.preventDefault()
    }

    isIllegalTitle() {
        let len = this.state.title.length
        return  len === 0 || len > 50
    }

    isIllegalDescription() {
        return this.state.description.length > 240
    }

    isIllegalQuest() {
        return this.isIllegalTitle() || this.isIllegalDescription()
    }

    render() {
        return (
            <form action="#" onSubmit={this.onSubmit}>
                <ul>
                    <li><label>Title:</label></li>
                    <li><input type="text" name="title" placeholder="Title" value={this.state.title} onChange={e => this.onTitleChange(e.target.value)} /></li>
                    <li className={"counter" + (this.isIllegalTitle() ? " illegal" : "")}><p>{this.state.title.length}/50</p></li>
                    <li><label>Description:</label></li>
                    <li><textarea name="description" placeholder="Description" value={this.state.description} onChange={e => this.onDescriptionChange(e.target.value)}></textarea></li>
                    <li className={"counter" + (this.isIllegalDescription() ? " illegal" : "")}><p>{this.state.description.length}/240</p></li>
                    <li><input type="submit" name="Submit" value="Add Quest" disabled={this.isIllegalQuest()} /></li>
                </ul>
            </form>
        )
    }

}
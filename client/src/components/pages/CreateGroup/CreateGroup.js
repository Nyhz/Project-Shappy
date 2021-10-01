import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import GroupService from '../../../services/group.services'

export default class CreateGroup extends Component {

    constructor({ props }) {
        super(props)
        this.state = {
            name: "",
            secret: "",
            groupAvatar: "",
            endDate: "",
            isEnded: false,
            owner: "",
        }
        this.groupService = new GroupService()
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { name, secret, endDate } = this.state
        const owner = this.props.loggedUser._id
        console.log(owner)
        this.groupService.create(name, secret, endDate, owner)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err))
    }

    handleJoinForm = (e) => {
        e.preventDefault()
        this.groupService.join(this.state.secret)
            .then(() => this.props.history.push('/dashboard'))
            .catch(err => console.log(err))

    }

    handleSecret = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div>
                <Container className='form_container'>
                    <h1>Create a group</h1>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Name of the group</Form.Label>
                            <Form.Control name="name" value={this.state.name} onChange={this.handleInput} type="text" placeholder="Enter group name..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Specify end date</Form.Label>
                            <Form.Control name="endDate" value={this.state.endDate} onChange={this.handleInput} type="date" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Form onSubmit={this.handleJoinForm}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Type supersecret code:</Form.Label>
                            <Form.Control name="secret" value={this.state.secret} onChange={this.handleSecret} type="text" placeholder="Enter code..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>


                </Container>
            </div>
        )
    }
}

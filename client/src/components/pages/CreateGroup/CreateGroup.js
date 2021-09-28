import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import GroupService from '../../../services/group.services'

export default class CreateGroup extends Component {

    constructor({ props }) {
        super(props)
        this.state = {
            name: "",
            password: "",
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
        e.preventDefault();
        const { name, password, endDate } = this.state
        const owner = this.props.loggedUser._id
        console.log(owner)
        this.groupService.create(name, password, endDate, owner)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className='form_container'>
                <h1>Create a group</h1>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Name of the group</Form.Label>
                        <Form.Control name="name" value={this.state.name} onChange={this.handleInput} type="text" placeholder="Enter group name..." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={this.state.password} onChange={this.handleInput} type="password" placeholder="Enter group password..." />
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
        )
    }
}

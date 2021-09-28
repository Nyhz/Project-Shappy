import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './Signup.css'

import AuthService from '../../../services/auth.services'

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: ""
        }
        this.authService = new AuthService()
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { username, password, email } = this.state
        this.authService.signUp(username, password, email)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className='form_container'>
                <h1>SIGN UP</h1>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={this.state.username} onChange={this.handleInput} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={this.state.email} onChange={this.handleInput} type="text" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={this.state.password} onChange={this.handleInput} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './Signup.css'

import AuthService from '../../../services/auth.services'
import UploadsService from '../../../services/uploads.services'

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            avatar: "",
            password: "",
            isLoading: false
        }
        this.authService = new AuthService()
        this.uploadsService = new UploadsService()
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { username, password, email, avatar } = this.state
        this.authService.signUp(username, password, email, avatar)
            .then((res) => {
                this.props.storeUser(res.data)
                this.props.history.push("/group/615717d8f7e751f86fb2c046") // Redirect to default group
            })
            .catch(err => console.log(err))
    }

    handleFile = (e) => {
        console.log(e.target);
        this.setState({
            ...this.state,
            isLoading: true
        })

        const uploadData = new FormData()

        uploadData.append('imageData', e.target.files[0])

        this.uploadsService.uploadImg(uploadData)
            .then(res => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    avatar: res.data.cloudinary_url
                })
            })
            .catch(err => alert(err, "Error"))

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

                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control onChange={(e) => this.handleFile(e)} name="avatar" type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={this.state.password} onChange={this.handleInput} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>

                </Form>
            </Container>
        )
    }
}

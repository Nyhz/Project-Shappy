import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../../../services/auth.services'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
        this.innerRef = React.createRef();
        this.authService = new AuthService()
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.innerRef.current.focus();
        }, 1)
    }
    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        this.authService.login(username, password)
            .then(res => {
                this.props.closeLoginModal();
                this.props.storeUser(res.data)
                this.props.history.push("/dashboard")
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container className='form_container'>

                <h1>LOGIN</h1>

                <Form onSubmit={this.handleFormSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control ref={this.innerRef} name="username" value={this.state.username} onChange={this.handleInput} type="text" placeholder="Enter username" />
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

export default Login
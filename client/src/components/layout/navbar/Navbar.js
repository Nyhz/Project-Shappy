import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import AuthService from '../../../services/auth.services'




class Navigation extends React.Component {
    constructor() {
        super()

    }
    authService = new AuthService()

    logout = () => {
        this.authService.logout()
            .then(res => {
                this.props.storeUser(null)
            })
            .catch(err => console.log(err))
    }

    redirect = () => {
        this.props.history.push('/');
    }

    functionCall = () => {
        this.logout()
        this.redirect()
    }

    render = () => {
        return (

            <Navbar bg="light" expand="md" >
                <Container>
                    <Navbar.Brand href="/">Project Shappy_</Navbar.Brand>
                    <Link className="nav-link" to="/creategroup">+</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.loggedUser ?
                                <>
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                    <span className="nav-link" onClick={this.functionCall}>Logout</span>
                                </>
                                :
                                <>
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >

        )
    }
}

export default withRouter(Navigation)

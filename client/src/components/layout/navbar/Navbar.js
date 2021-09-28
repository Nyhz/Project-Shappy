import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../../services/auth.services'

const authService = new AuthService()


export default function Navigation(props) {

    const logout = () => {
        authService.logout()
            .then(res => props.storeUser(null))
            .catch(err => console.log(err))
    }

    return (

        <Navbar bg="light" expand="md">
            <Container>
                <Navbar.Brand href="/">Project Shappy_</Navbar.Brand>
                <Link className="nav-link" to="/creategroup">+</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {props.loggedUser ?
                            <>
                                <Link className="nav-link" to="#">Profile</Link>
                                <span className="nav-link" onClick={logout}>Logout</span>
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

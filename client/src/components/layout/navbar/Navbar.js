import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import './Navbar.css'

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
            <Navbar className='navbar sticky-top' bg="light" expand="md" >
                <Container>
                    <Link to='/dashboard'><Navbar.Brand href="/dashboard">Shappy_</Navbar.Brand></Link>
                    <Nav className="me-auto ">
                        {this.props.loggedUser &&
                            <div className='nav_container'>
                                <Link className="nav-link create_group" to="/creategroup">+</Link>
                                <Link className="nav-link" to="/profile">Profile</Link>
                                <span className="nav-link" onClick={this.functionCall}>Logout</span>
                            </div>
                        }
                    </Nav>
                </Container>
            </Navbar >
        )
    }
}

export default withRouter(Navigation)

import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import './Navbar.css'

import AuthService from '../../../services/auth.services'



class Navigation extends React.Component {

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
            <>
                <Navbar sticky="top" className='navbar_container'>
                    <Container>
                        <Navbar.Brand className='logo_container' as={Link} to="/dashboard">
                            <img
                                alt="Shappy logo"
                                src="../../../../shappy_logo.png"
                                className="logo"
                            />
                        </Navbar.Brand>
                        <Nav className="ms-auto">
                            {this.props.loggedUser &&
                                <div className='nav_container'>
                                    <Nav.Link as={Link} to="/shop"><span class="material-icons">shopping_basket</span></Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        activeStyle={{ color: 'white' }}
                                        className='nav-button'
                                        to="/profile">
                                        <span class="material-icons">person</span>
                                    </Nav.Link>
                                    <Nav.Link className='nav-button' onClick={this.functionCall}><span class="material-icons">logout</span></Nav.Link>
                                </div>
                            }
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }

}
export default withRouter(Navigation)

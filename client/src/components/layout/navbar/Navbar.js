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
            
    //         <Navbar className='navbar sticky-top' bg="dark" expand="md" >
    //             <Container>
    //                 <Link to='/dashboard'><Navbar.Brand href="/dashboard"></Navbar.Brand></Link>
    //                 <Nav className="me-auto ">
    //                     {this.props.loggedUser &&
    //                         <div className='nav_container'>
    //                             <Link className="nav-link create_group" to="/creategroup">+</Link>
    //                             <Link className="nav-link" to="/profile">Profile</Link>
    //                             <span className="nav-link" onClick={this.functionCall}>Logout</span>
    //                         </div>
    //                     }
    //                 </Nav>
    //             </Container>
    //         </Navbar>
            
    //     )    
    // }
        <>
            <Navbar fixed="top"  bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard">
                        <img
                        alt="Shappy logo"
                        src="../../../../SHAPPY_LOGO_TITLE.png"
                        className="logo"
                        />             
                        {/* {' '}React Bootstrap */}
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        {this.props.loggedUser &&

                        <div className='nav_container'>
                            {/* <Nav.Link as={Link} to="/creategroup">+</Nav.Link> */}
                            <Nav.Link as={Link} to="/profile"></Nav.Link>
                            <Nav.Link onClick={this.functionCall}>Logout</Nav.Link>
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

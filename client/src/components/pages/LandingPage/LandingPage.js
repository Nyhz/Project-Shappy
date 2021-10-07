import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './LandingPage.css'
import { Fade, Zoom } from "react-awesome-reveal";

export default class LandingPage extends Component {
    constructor() {
        super();

        this.state = {
            showLogin: false,
            showSignup: false
        }
    }

    openLoginModal = () => {
        this.setState({
            ...this.state,
            showLogin: true
        })
    }

    closeLoginModal = () => {
        this.setState({
            ...this.state,
            showLogin: false
        });
    }

    openSignupModal = () => {
        this.setState({
            ...this.state,
            showSignup: true
        })
    }

    closeSignupModal = () => {
        this.setState({
            ...this.state,
            showSignup: false
        });
    }

    render = () => {
        return (
            <div className='landing_container' >
                <div className='landing_container_one' >
                    <div className='box-one'>
                        <h1>Hello, welcome to Shappy!</h1>
                        <h3>~ Ashamed of being Happy ~</h3>
                    </div>
                    <div className='button_container'>
                        {!this.props.loggedUser && <Button className="login-button mt-2" onClick={() => this.openLoginModal()}>Log in</Button>}
                        {!this.props.loggedUser && <Button className="signup-button mt-2" onClick={() => this.openSignupModal()}>Sign up</Button>}
                    </div>

                    <div className='landing-box'>
                        <Fade delay='150'>
                            <h2>Why Shappy?</h2>
                        </Fade>
                        <Fade delay='250'>
                            <p>You can share your photos!</p>
                        </Fade>
                        <Fade delay='350'>
                            <p>Have fun while uploading</p>
                        </Fade>
                        <Fade delay='450'>
                            <p>Mess up with your friends</p>
                        </Fade>
                    </div>
                    <Zoom>
                        <div className='shappy-logo'>
                            <img src="../../../../shappy_straight.png" alt="" />
                        </div>
                    </Zoom>
                    <div className='footer'>
                        <Fade delay='700'>
                            <small>Proudly developed by Nyhz and JesusLovesYou <span class="heart-icon material-icons">favorite</span></small>
                        </Fade>
                    </div>

                    <Modal className='modal_container' show={this.state.showLogin} onHide={() => this.closeLoginModal()}>
                        <Modal.Header className='modal_header' closeButton>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modal_body'>
                            <Login history={this.props.history} loggedUser={this.props.loggedUser} storeUser={this.props.storeUser} closeLoginModal={() => this.closeLoginModal()} />
                        </Modal.Body>
                    </Modal>
                    <Modal className='modal_container' show={this.state.showSignup} onHide={() => this.closeSignupModal()}>
                        <Modal.Header className='modal_header' closeButton>
                            <Modal.Title>Sign up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='modal_body'>
                            <Signup history={this.props.history} loggedUser={this.props.loggedUser} storeUser={this.props.storeUser} closeSignupModal={() => this.closeSignupModal()} />
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='landing_container_two'>
                </div>
            </div >
        )
    }
}

import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './LandingPage.css'


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
                <h1>Hola, bienvenido a Shappy.</h1>
                <h3>~ Ashamed to be Happy ~</h3>
                {!this.props.loggedUser && <Button className="landing-button mt-2" onClick={() => this.openLoginModal()}>Log in</Button>}
                {!this.props.loggedUser && <Button className="landing-button mt-2" onClick={() => this.openSignupModal()}>Sign up</Button>}

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
        )
    }
}

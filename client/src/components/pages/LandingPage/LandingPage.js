import React, { Component } from 'react'
import './LandingPage.css'
import { Button, Modal } from 'react-bootstrap'
import Login from '../Login/Login';

export default class LandingPage extends Component {
    constructor() {
        super();

        this.state = {
            show: false,
        }
    }

    openModal = () => {
        this.setState({
            ...this.state,
            show: true
        })
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            show: false
        });
    }

    render = () => {
        return (
            <div className='landing_container' >
                <h1>Hola, bienvenido a Shappy.</h1>
                <h3>~ Ashamed to be Happy ~</h3>
                <Button block className="mt-2" onClick={() => this.openModal()}>Login</Button>

                <Modal className='modal_container' show={this.state.show} onHide={() => this.closeModal()}>
                    <Modal.Header className='modal_header' closeButton>
                        <Modal.Title>Log in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal_body'>
                        <Login history={this.props.history} loggedUser={this.props.loggedUser} storeUser={this.props.storeUser} closeModal={() => this.closeModal()} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import UploadsService from '../../../services/uploads.services'
import ContentService from '../../../services/content.services'
import './CreateSlander.css'

export default class CreateSlander extends Component {
    constructor() {
        super()
        this.state = {
            content: null,
            groupRef: null,
            error: null,
            disabled: false

        }

        this.uploadService = new UploadsService()
        this.contentService = new ContentService()

    }

    componentDidMount = () => {
        this.getGroupList()
    }

    displayGroupList = () => {
        const openGroups = this.state.groups?.filter(elm => elm.isEnded !== true)
        return (
            openGroups.length > 0 ?
                openGroups.map(elm => {
                    return (
                        <option value={elm._id} name={'groupRef'}>{elm.name}</option>
                    )
                }) :
                <p>Sin resultados</p>
        )
    }

    getGroupList = () => {
        this.contentService.getGroups()
            .then((groups) => {
                console.log(groups.data.groups.groups)
                this.setState({
                    groups: groups.data.groups.groups
                })
            })
            .catch(err => console.log(err))
    }


    handleChange = (e) => {

        const { value } = e.target;
        console.log(value);

        this.setState({
            ...this.state,
            content: value
        })
    }

    handleSelectChanges = (e) => {

        const { value } = e.target;
        console.log(value);

        this.setState({
            ...this.state,
            groupRef: value
        })
    }

    handleSubmit = async (e) => {
        await this.setState({ disabled: true })
        e.preventDefault();
        this.contentService.newSlander(this.state)
            .then((slander) => {
                this.setState({
                    slander: slander.data
                })
            })
            .then(() => this.props.history.push(`/group/${this.state.groupRef}`))
            .catch(err => {
                this.setState({
                    ...this.state,
                    error: err.response.data.message
                })
                console.error(err)
            })
    }


    render = () => {
        return (
            <Container className='form_container'>
                <h1>Upload new slander</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="tag">
                        <Form.Label>Slander: </Form.Label>
                        <Form.Control onChange={(e) => this.handleChange(e)} name="content" type="text" autoComplete='off' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select" onChange={(e) => this.handleSelectChanges(e)}>
                            <option>Select group</option>
                            {
                                this.state.groups ?
                                    this.displayGroupList()
                                    :
                                    <option value="">Loading groups</option>
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={this.state.disabled} className='slander-submit' type="submit">
                        Submit
                    </Button>
                </Form>

                <img className='slander-img' src="../../../../Bla_background.png" alt="backgroundbla" />
                {this.state.error && <span id='errorMsg'>{this.state.error}</span>}
            </Container>
        )
    }
}
